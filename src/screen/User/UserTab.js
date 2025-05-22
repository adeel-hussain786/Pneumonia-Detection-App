import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserDashboard from './UserDashboard';
import HistoryScreen from './HistoryScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoScreen from './VedioScreen';  // Ensure this file exists and is named correctly
import Historyicon from "../../assests/history.png"
import { Image } from 'react-native';
import HomeIcon from "../../assests/home.png"
import VideoIcon from "../../assests/video.png"

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#28a745',
        tabBarStyle: { height: 60, paddingBottom: 5, backgroundColor: '#f8f9fa' },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={UserDashboard}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={HomeIcon} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
      />

      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={Historyicon} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
      />

      <Tab.Screen
        name="Video"
        component={VideoScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image source={VideoIcon} style={{ width: 24, height: 24, tintColor: color }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserTabs;
