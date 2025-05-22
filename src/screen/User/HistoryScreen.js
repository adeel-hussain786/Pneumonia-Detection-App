import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const HistoryScreen = () => {
  const [emailInput, setEmailInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);


  
  useFocusEffect(
    useCallback(() => {
      // Screen is focused
      return () => {
        // Screen is unfocused
        setEmailInput('');
        setHistory([]);
      };
    }, [])
  );

  const fetchHistory = async () => {
    if (!emailInput.trim()) {
      Alert.alert('Error', 'Please enter an email address');
      return;
    }

    setLoading(true);
    try {
      const db = getFirestore();
      const q = query(
        collection(db, 'predictionHistory'),
        where('email', '==', emailInput.trim())
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHistory(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch history');
      console.error(error);
    } finally {
      setLoading(false);
    }

    
  };

  return (
    <FlatList
      data={history}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerRight}>
              <Text style={styles.headerTitle}>Prediction History</Text>
              <Image
                source={require('C:\\Users\\Adeel Hussain\\Hussain\\src\\assests\\xray.png')}
                style={styles.icon}
              />
            </View>
          </View>

          <Text style={styles.heading}>Check Past Predictions</Text>

          <TextInput
            placeholder="Enter email"
            value={emailInput}
            onChangeText={setEmailInput}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TouchableOpacity style={styles.uploadButton} onPress={fetchHistory}>
            <Text style={styles.uploadText}>Check History</Text>
          </TouchableOpacity>

          {loading && (
            <ActivityIndicator size="large" color="#28a745" style={{ marginTop: 30 }} />
          )}

          {!loading && history.length === 0 && (
            <Text style={styles.text}>No history found.</Text>
          )}
        </View>
      }
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.label}>
            Result: <Text style={{ color: '#28a745' }}>{item.result}</Text>
          </Text>
          <Text style={styles.date}>
            Date: {item.predictedAt?.toDate().toLocaleString()}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    paddingBottom: 50,
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
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
    alignItems: 'center',
  },
  uploadText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  date: {
    fontSize: 14,
    color: '#555',
  },
});

export default HistoryScreen;
