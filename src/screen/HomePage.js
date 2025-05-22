import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Signup from './Login_Signup/Signup';
import Login from './Login_Signup/Login';

const HomePage = ({ navigation }) => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleScreen = () => setShowLogin(!showLogin);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Welcome to Pneumonia Detection</Text>

          {showLogin ? (
            <>
              <Login navigation={navigation} />
              <TouchableOpacity onPress={toggleScreen}>
                <Text style={styles.switchText}>
                  Don't have an account? <Text style={styles.link}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Signup navigation={navigation} />
              <TouchableOpacity onPress={toggleScreen}>
                <Text style={styles.switchText}>
                  Already have an account? <Text style={styles.link}>Login</Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  avoidingView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center',
  },
  switchText: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
    color: '#4CAF50',
    fontSize: 16,
  },
  link: {
    fontWeight: 'bold',
    color: '#388E3C',
  },
});

export default HomePage;
