import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigator/StackNavigator';
import AuthProvider from './src/context/AuthContext';
import ProductsProvider from './src/context/ProductsContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ProductsProvider>
          <StackNavigator />
        </ProductsProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
