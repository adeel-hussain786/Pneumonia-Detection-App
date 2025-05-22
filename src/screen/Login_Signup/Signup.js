import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';



const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    general: ''
  });

  const [success, setSuccess] = useState('');

  const handleSignup = () => {
    let valid = true;
    let newError = { email: '', password: '', confirmPassword: '', general: '' };
    setSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newError.email = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(email)) {
      newError.email = 'Please enter a valid email address';
      valid = false;
    }

    
    if (!password) {
      newError.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newError.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (password !== confirmPassword) {
      newError.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    
    if (!valid) {
      setError(newError);
      return;
    }

  
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setError({ email: '', password: '', confirmPassword: '', general: '' });
        setSuccess('Account created successfully!');
        setTimeout(()=>navigation.replace("UserDashboard"), 1000);
        

        setEmail('');
        setPassword('');
        setConfirmPassword('');

        
      })
      .catch(error => {
        setSuccess('');
        const updatedError = { ...newError };

        switch (error.code) {
          case 'auth/email-already-in-use':
            updatedError.email = 'This email is already registered';
            break;
          case 'auth/invalid-email':
            updatedError.email = 'Invalid email format';
            break;
          case 'auth/weak-password':
            updatedError.password = 'Password is too weak';
            break;
          default:
            updatedError.general = error.message;
        }

        setError(updatedError);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setError(prev => ({ ...prev, email: '' }));
        }}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error.email ? <Text style={styles.errorText}>{error.email}</Text> : null}

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setError(prev => ({ ...prev, password: '' }));
        }}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      {error.password ? <Text style={styles.errorText}>{error.password}</Text> : null}

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          setError(prev => ({ ...prev, confirmPassword: '' }));
        }}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      {error.confirmPassword ? <Text style={styles.errorText}>{error.confirmPassword}</Text> : null}

      {error.general ? <Text style={styles.errorText}>{error.general}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      <Button mode="contained" onPress={handleSignup} style={styles.button}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 4,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default Signup;