import React from 'react';
import {
  DiscountScreen,
  SettingsScreen,
  NotificationsScreen,
  NoticePrivacyScreen,
  TermsAndConditionsScreen,
  EventDetailsAuxScreen,
  WebviewScreen,
  ChangePasswordScreen,
  EventDatesAuxScreen,
  MSIScreen,
  EventMosaicScreen,
  CurrentPresalesScreen,
} from '../screens';
import BottomTabNav from './BottomTabNav';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from '../screens/dashboard/Location';

const { Navigator, Screen } = createNativeStackNavigator();

const DashboardNav = () => {
  return (
    <Navigator
      initialRouteName="BottomTab"
      screenOptions={{ headerShown: false }}>
      <Screen name="BottomTab" component={BottomTabNav} />
      <Screen name="Discounts" component={DiscountScreen} />
      <Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Screen name="NoticePrivacy" component={NoticePrivacyScreen} />
      <Screen name="Notifications" component={NotificationsScreen} />
      <Screen name="Settings" component={SettingsScreen} />
      <Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Screen name="EventDetailsAux" component={EventDetailsAuxScreen} />
      <Screen name="EventDatesAux" component={EventDatesAuxScreen} />
      <Screen name="Webview" component={WebviewScreen} />
      <Screen name="Location" component={LocationScreen} />
      <Screen name="MSI" component={MSIScreen} />
      <Screen name="EventMosaic" component={EventMosaicScreen} />
      <Screen name="CurrentPresales" component={CurrentPresalesScreen} />
    </Navigator>
  );
};

export default DashboardNav;
