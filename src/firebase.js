// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD5Ht6fndN7oEomKXIRdoE80GdZIU5Qy1E",
  authDomain: "pneumonia-detection-dc38a.firebaseapp.com",
  projectId: "pneumonia-detection-dc38a",
  storageBucket: "pneumonia-detection-dc38a.appspot.com",
  messagingSenderId: "1036074929981",
  appId: "1:1036074929981:android:9ad23863c26901e3f5ff54",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
import { getAuth } from 'firebase/auth';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { app, auth };
