import React, { useEffect } from 'react';
import ReduxThunk from 'redux-thunk';
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import Reducers from './src/redux/reducers';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { createStore, applyMiddleware } from 'redux';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthNav, DashboardNav, ValidationsNav } from './src/routes';
import { Mapping, Theme, FontAwesome5, PlatformCache } from './src/utils';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { requestTrackingPermission } from 'react-native-tracking-transparency';
import { RootSiblingParent } from 'react-native-root-siblings';
import Messaging from '@react-native-firebase/messaging';

const { Navigator, Screen } = createNativeStackNavigator();
const store = createStore(Reducers, applyMiddleware(ReduxThunk));

const App = () => {
  activateTracking();

  useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  async function activateTracking() {
    const trackingStatus = await requestTrackingPermission();
    await PlatformCache.setTrackingStatus(trackingStatus);
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <IconRegistry icons={[EvaIconsPack, FontAwesome5]} />
          <ApplicationProvider
            {...eva}
            theme={{ ...eva.light, ...Theme }}
            customMapping={Mapping}>
            <NavigationContainer>
              <Navigator
                initialRouteName="Validations"
                screenOptions={{ headerShown: false }}>
                <Screen name="Auth" component={AuthNav} />
                <Screen name="Dashboard" component={DashboardNav} />
                <Screen name="Validations" component={ValidationsNav} />
              </Navigator>
            </NavigationContainer>
          </ApplicationProvider>
        </RootSiblingParent>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

// {
//   "APPLICATION_ID": "com.ocesa.app",
//   "APP_VERSION_CODE": "030000",
//   "APP_VERSION_NAME": "3.0.0",
//   "BUILD_TYPE": "debug",
//   "DEBUG": true,
//   "ENVIRONMENT": "prod",
//   "VERSION_CODE": 30000,
//   "VERSION_NAME": "3.0.0",
//   "getConstants": [Function anonymous]
// }
