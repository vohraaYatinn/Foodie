/**
 * @format
 */
import 'react-native-gesture-handler'; // Import first
import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import App from './App';
import { name as appName } from './app.json';

// Wrap App with GestureHandlerRootView
const RootComponent = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => RootComponent);
