import React from 'react';
import { InitialValidationsScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

const ValidationsNav = () => {
  return (
    <Navigator
      initialRouteName="InitialValidations"
      screenOptions={{ headerShown: false }}>
      <Screen name="InitialValidations" component={InitialValidationsScreen} />
    </Navigator>
  );
};

export default ValidationsNav;
