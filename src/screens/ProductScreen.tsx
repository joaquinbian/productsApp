import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = ({navigation, route}: Props) => {
  console.log(route);
  const {id, name} = route.params;

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  return (
    <View>
      <Text>Product Screen</Text>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
