import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductScreen from '../screens/ProductScreen';

export type ProductsStackParams = {
  ProuctsScreen: undefined;
  ProductScreen: {id?: string; name?: string};
};
const ProductsNavigator = () => {
  const Stack = createStackNavigator<ProductsStackParams>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProuctsScreen" component={ProductsScreen} options={{title: 'Products'}} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
};
export default ProductsNavigator;
