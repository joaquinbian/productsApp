import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {useCategories} from '../hooks/useCategories';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = ({navigation, route}: Props) => {
  console.log(route);
  const {id, name} = route.params;

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  return (
    <ScrollView>
      <Text>{name}</Text>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    marginHorizontal: 5,
  },
  textInput: {
    borderColor: 'rgba(0,0,0,.6)',
    borderWidth: 1,
    color: 'black',
    height: 45,
    marginTop: 5,
  },
});
