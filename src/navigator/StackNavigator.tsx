import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import React from 'react';
import Home from '../screens/Home';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
};
const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
