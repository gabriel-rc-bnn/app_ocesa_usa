import React from 'react';
import { TabBar, Tab, Layout, useTheme } from '@ui-kitten/components';
import { RelativesScreen, PresalesScreen, ConcertsScreen } from '../screens';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Colors } from '../utils';
import { Container } from '../components';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabNav = () => {
  const theme = useTheme();
  const TopTabBar = ({ navigation, state }) => (
    <TabBar
      appearance="primary"
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <Tab title="Conciertos" />
      <Tab title="Familiares" />
      <Tab title="Preventas" />
    </TabBar>
  );

  return (
    <Container
      withBar={{ themeBar: 'light', colorBar: theme['color-primary-600'] }}>
      <Navigator
        tabBar={props => <TopTabBar {...props} />}
        initialRouteName="Concerts"
        screenOptions={{ headerShown: false }}>
        <Screen name="Concerts" component={ConcertsScreen} />
        <Screen name="Relatives" component={RelativesScreen} />
        <Screen name="Presales" component={PresalesScreen} />
      </Navigator>
    </Container>
  );
};

export default TopTabNav;
