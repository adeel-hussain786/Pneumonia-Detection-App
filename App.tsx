import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from './src/screen/HomePage';
import UserDashboard from './src/screen/User/UserDashboard';
import SplashScreen from './src/screen/SplashScreen';
import UserTab from './src/screen/User/UserTab';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="UserDashboard" component={UserTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
