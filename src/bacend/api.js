import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import { Alert } from 'react-native';

export const savePredictionToBackend = async (email, label) => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, 'predictionHistory'), {
      email: email,
      result: label,
      predictedAt: Timestamp.now(),
    });
    if (__DEV__) console.log('Prediction saved to Firestore!');
  } catch (error) {
    console.error('Error saving prediction:', error);
    Alert.alert('Error', 'Failed to save prediction');
  }
};


export const saveUserToFirestore = async (email,label) => {
  try {
    const db = getFirestore();
    await addDoc(collection(db, 'users'), {
      email: email,
      result:label,
      createdAt: Timestamp.now(),
    });
    if (__DEV__) console.log('User email saved to Firestore!');
  } catch (error) {
    console.error('Error saving user to Firestore:', error);
    Alert.alert('Error', 'Failed to save user info');
  }
};
