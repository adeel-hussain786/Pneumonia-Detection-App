import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');
    setGeneralError('');
    setSuccess('');

    if (!email) {
      setEmailError("Email is Required");
      return;
    }

    const checkEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!checkEmail.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setPasswordError("Password is Required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setSuccess("Logged in Successfully");
        setPassword('');
        setEmail('');
        setTimeout(() => {
          navigation.replace('UserDashboard');
        }, 1000);
      })
      .catch(error => {
        handleLoginError(error);
      });
  };

  const handleLoginError = (error) => {
    let errorMessage = '';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = "Not registered yet. Please create an account first";
        break;
      case 'auth/wrong-password':
        errorMessage = "Incorrect password";
        break;
      case 'auth/invalid-email':
        errorMessage = "Invalid email format";
        break;
      default:
        errorMessage = "Something went wrong. Please try again later";
    }
    setGeneralError(errorMessage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          setEmailError('');
          setGeneralError('');
        }}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        label="Password"
        value={password}
        onChangeText={text => {
          setPassword(text);
          setPasswordError('');
          setGeneralError('');
        }}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      {generalError ? <Text style={styles.errorText}>{generalError}</Text> : null}
      {success ? <Text style={styles.successText}>{success}</Text> : null}

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 32,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
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

export default Login;