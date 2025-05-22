import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('HomePage');
    }, 2000); 
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#E8F5E9', '#C8E6C9']} 
      style={styles.container}
    >
      <Image
        source={require('../assests/homepage.png')} 
        style={styles.logo}
      />
      <Text style={styles.text}>Pneumonia Detection</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 130,
    height: 130,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 26,
    color: '#2E7D32', 
    fontWeight: 'bold',
  },
});

export default SplashScreen;
