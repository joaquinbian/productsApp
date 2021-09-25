import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

const ProductScreen = ({navigation, route}: Props) => {
  console.log(route);
  const {id, name} = route.params;

  useEffect(() => {
    navigation.setOptions({title: name});
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Product name"
        placeholder="Iphone XS..."
        placeholderTextColor="rgba(0,0,0,.3)"
        // labelStyle={{color: '#000'}}
        leftIcon={<Icon name="pricetag-outline" size={20} color="rgba(0,0,0,.3)" />}
      />
      {/* picker*/}
      <View style={{marginLeft: 10}}>
        <Text>Categoria</Text>
      </View>
      <Button title="Save" containerStyle={{marginTop: 10}} buttonStyle={{backgroundColor: '#7472F3'}} />
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Button
          title="Camera"
          containerStyle={{marginTop: 10}}
          buttonStyle={{backgroundColor: '#7472F3'}}
          iconRight
          icon={<Icon name="camera-outline" size={20} style={{marginLeft: 10, color: '#fff'}} />}
        />
        <Button
          title="Gallery"
          containerStyle={{marginTop: 10}}
          buttonStyle={{backgroundColor: '#7472F3'}}
          iconRight
          icon={<Icon name="image-outline" size={20} style={{marginLeft: 10, color: '#fff'}} />}
        />
      </View>
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
