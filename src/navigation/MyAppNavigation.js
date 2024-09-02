import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import OfferWall from '../screens/OfferWall';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OfferWall" component={OfferWall} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
