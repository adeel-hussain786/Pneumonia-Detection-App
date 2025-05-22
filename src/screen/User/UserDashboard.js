import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import Tflite from 'tflite-react-native';
import { EmailAuthCredential, getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {savePredictionToBackend, saveUserToFirestore} from "../../bacend/api"




const UserDashboard = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const tflite = new Tflite();
  const [userEmail, setUserEmail] = useState('');

 

  

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (image) {
          Alert.alert('Go Back', 'Discard the selected image?', [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Yes', 
              onPress: () => {
                setImage(null);
                setResult('');
              }
            },
          ]);
          return true;
        } else {
          navigation.replace('HomePage');
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [image, navigation])
  );

  useEffect(() => {
    tflite.loadModel(
      {
        model: 'pneumonia.tflite',
        labels: 'label.txt',
      },
      (err) => {
        if (err) {
          Alert.alert('Error', 'Model loading failed');
          if (__DEV__) console.log('Model load error:', err);
        } else {
          setModelLoaded(true);
          if (__DEV__) console.log('Model loaded');
        }
      }
    );
  }, []);
  

  const handleImageResponse = (response) => {
    if (response.didCancel || response.errorCode) {
      const errorMsg = response.errorMessage || 'Something went wrong while accessing the image.';
      Alert.alert('Error', errorMsg);
      return;
    }

    const uri = response.assets?.[0]?.uri;
    if (uri) {
      setImage(uri);
      setResult('');
      Alert.alert('Success', 'Photo captured successfully!');
    } else {
      Alert.alert('Error', 'No image found.');
    }
  };

  const pickImage = () => {
    Alert.alert('Select Image Source', 'Choose how to upload image:', [
      {
        text: '📷 Take Photo',
        onPress: () =>
          launchCamera({ mediaType: 'photo', quality: 1, saveToPhotos: true }, handleImageResponse),
      },
      {
        text: '🖼️ Choose from Gallery',
        onPress: () =>
          launchImageLibrary({ mediaType: 'photo', quality: 1 }, handleImageResponse),
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const predict = async () => {
    if (!image || !modelLoaded) {
      Alert.alert('Error', 'Model not loaded or no image selected!');
      return;
    }

    if (!userEmail) {
      Alert.alert('Error', 'User email not found!');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const res = await new Promise((resolve, reject) => {
        tflite.runModelOnImage(
          {
            path: image,
            imageMean: 128,
            imageStd: 128,
            numResults: 2,
            threshold: 0.05,
          },
          (err, result) => (err ? reject(err) : resolve(result))
        );
      });

      setLoading(false);

      if (res?.length > 0) {
        const predictionResult = `${res[0].label} (${(res[0].confidence * 100).toFixed(2)}%)`;
        setResult(predictionResult);

      

        // Save prediction to the backend
        await savePredictionToBackend(userEmail, res[0].label);
        await saveUserToFirestore(userEmail,res[0].label);
        
        

      } else {
        setResult('No prediction found.');
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Prediction Error', err.message || 'Failed to predict');
      if (__DEV__) console.log('Prediction error:', err);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      setUserEmail(user.email);
    } else {
      Alert.alert('Error', 'User not logged in');
      navigation.replace('Login'); // Optional: Redirect to login if no user
    }
  }, []);
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRight}>
          <Text style={styles.headerTitle}>Pneumonia Detection</Text>
          <Image
            source={require('C:\\Users\\Adeel Hussain\\Hussain\\src\\assests\\xray.png')}
            style={styles.icon}
          />
        </View>
      </View>

      {/* Image Upload */}
      <Text style={styles.heading}>Upload Chest X-ray</Text>
      <View style={styles.uploadBox}>
        {image ? (
          <Image source={{ uri: image }} style={styles.uploadedImage} />
        ) : (
          <Text style={styles.cameraIcon}>📷</Text>
        )}
      </View>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>Upload</Text>
      </TouchableOpacity>

      {image && (
     <TouchableOpacity
     style={styles.predictButton}
     onPress={() => {
       Alert.alert(
         'Confirm',
         'Are you sure this is a chest X-ray?',
         [
           { text: 'Cancel', style: 'cancel',
            onPress: () => {
              setImage(null);
              setResult('');
             },


           },
           { text: 'Yes', onPress: predict


            },
         ]
       );
     }}
     disabled={loading}
   >
     <Text style={styles.predictText}>Get Result</Text>
   </TouchableOpacity>
   
      )}

      {loading && <ActivityIndicator size="large" color="#00AA00" style={{ margin: 15 }} />}

      {result.trim() !== '' && (
        <>
          <Text style={styles.resultText}>Result: {result}</Text>
          
          
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 33,
  },
  uploadBox: {
    width: 260,
    height: 260,
    borderRadius: 16,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cameraIcon: {
    fontSize: 42,
    color: '#aaa',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  uploadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  predictButton: {
    backgroundColor: '#218838',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginTop: 20,
  },
  predictText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#17a2b8',
  },
 
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: -88,
    marginRight: 53,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: -8,
    marginTop: -28,
    marginRight: 22,
    borderRadius: 14,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
});

export default UserDashboard;
