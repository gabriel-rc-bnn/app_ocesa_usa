import { AppRegistry } from 'react-native';
import App from './App';
import { LogBox } from 'react-native';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  await UserCache.setNotifications({
    text: remoteMessage.data.text,
    date: new Date(),
  });
});

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

AppRegistry.registerComponent(appName, () => App);
