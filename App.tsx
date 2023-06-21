import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from './screens/Home/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import About from './screens/About/About';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from './screens/Search/Search';
import { StatusBar } from 'react-native';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeStackParams>;
  About: { breed: string };
  Search: undefined;
};
const Stack = createBottomTabNavigator<RootStackParamList>();

type HomeStackParams = {
  Home: undefined;
  About: { breed: string };
};
const BreedStack = createStackNavigator<HomeStackParams>();

const HomeBreedScreen = () => {
  return (
    <BreedStack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="About" component={About} />
    </BreedStack.Navigator>
  );
};

export default function App() {
  StatusBar.setBarStyle('dark-content');
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeBreedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
