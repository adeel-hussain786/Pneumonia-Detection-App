/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';  // Update path to reflect the actual location of App.js

import {name as appName} from './app.json'; // ✅ Fixed path

AppRegistry.registerComponent(appName, () => App);
