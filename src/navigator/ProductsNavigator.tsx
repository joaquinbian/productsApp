import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';
import AddProductScreen from '../screens/AddProductScreen';

export type ProductsStackParams = {
  ProductsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
  AddProductScreen: {id?: string; name?: string};
};
const ProductsNavigator = () => {
  const Stack = createStackNavigator<ProductsStackParams>();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#fff',
        },
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 0, //para que no se vea la sombrita en android
          shadowColor: 'transparent', //para que no se vea la sombrita en ios
        },
      }}>
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} options={{title: 'Products'}} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} options={{title: 'New Product'}} />
    </Stack.Navigator>
  );
};
export default ProductsNavigator;
