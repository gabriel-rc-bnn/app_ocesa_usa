import React from 'react';
import { HomeScreen, SearchScreen, FavoritesScreen } from '../screens';
import * as FirebaseService from '../firebase';
import {
  Icon,
  useTheme,
  BottomNavigation,
  BottomNavigationTab,
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TopTabNav from './TopTabNav';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabNav = () => {
  const theme = useTheme();

  const RenderIcon = ({ props, name }) => (
    <Icon
      {...props}
      name={name}
      pack="font-awesome-5"
      solid={props.style.tintColor !== theme['color-basic-600']}
    />
  );

  const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab
        title="Inicio"
        icon={props => <RenderIcon props={props} name="home" />}
        onPress={FirebaseService.trackScreen(FirebaseService.pageName.home)}
      />
      <BottomNavigationTab
        title="Búsqueda"
        icon={props => <RenderIcon props={props} name="search" />}
        onPress={FirebaseService.trackScreen(FirebaseService.pageName.search)}
      />
      <BottomNavigationTab
        title="Favoritos"
        icon={props => <RenderIcon props={props} name="heart" />}
        onPress={FirebaseService.trackScreen(FirebaseService.pageName.profile)}
      />
      <BottomNavigationTab
        title="Cartelera"
        icon={props => <RenderIcon props={props} name="calendar" />}
        onPress={FirebaseService.trackScreen(
          FirebaseService.pageName.billboard,
        )}
      />
    </BottomNavigation>
  );

  return (
    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Search" component={SearchScreen} />
      <Screen name="Favorites" component={FavoritesScreen} />
      <Screen name="Billboard" component={TopTabNav} />
    </Navigator>
  );
};

export default BottomTabNav;
