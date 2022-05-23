import React from 'react';
import {
  MenuScreen,
  LoginScreen,
  TastesScreen,
  ResultTastesScreen,
  TastesArtistScreen,
  WelcomeTastesScreen,
  CreateAccountScreen,
  RecoveryPasswordScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

const AuthNav = () => {
  return (
    <Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
      <Screen name="Menu" component={MenuScreen} />
      <Screen name="Login" component={LoginScreen} />
      <Screen name="Tastes" component={TastesScreen} />
      <Screen name="ResultTastes" component={ResultTastesScreen} />
      <Screen name="TastesArtist" component={TastesArtistScreen} />
      <Screen name="CreateAccount" component={CreateAccountScreen} />
      <Screen name="WelcomeTastes" component={WelcomeTastesScreen} />
      <Screen name="RecoveryPassword" component={RecoveryPasswordScreen} />
    </Navigator>
  );
};

export default AuthNav;
