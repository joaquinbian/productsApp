import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import React from 'react';
import Home from '../screens/Home';
import Register from '../screens/Register';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};
const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParams>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
