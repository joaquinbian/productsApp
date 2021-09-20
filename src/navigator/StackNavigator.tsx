import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import React from 'react';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
