import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useCategories} from '../hooks/useCategories';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';

interface Props extends StackScreenProps<ProductsStackParams, 'AddProductScreen'> {}

const AddProductScreen = ({route, navigation}: Props) => {
  const {categories} = useCategories();
  const {name, id} = route.params;
  const {loadProductById} = useContext(ProductsContext);
  const {_id, nombre, categoriaId, img, onChangeHandler, state, setFormValues} = useForm({
    _id: '',
    nombre: name,
    categoriaId: '',
    img: '',
  });

  const getProduct = async () => {
    try {
      const resp = await loadProductById(id!);
      setFormValues({
        _id: id || '', //pq puede ser undefined
        categoriaId: resp.categoria._id,
        img: resp.img || '', //si pongo el signo de exclamación en lugar de esto, se me rompe
        //ṕorque dice que img es undefined y en el estado no agrega esta propiedad
        //si lo dejo asi y no tiene una img, deja un string vacio
        nombre,
      });
    } catch (error) {
      console.log({error});
    }
  };

  useEffect(() => {
    if (name) {
      navigation.setOptions({title: name});
    }
  }, []);

  useEffect(() => {
    getProduct().then(() => {
      console.log('LA CATEGORIA ES ', categoriaId);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Product name"
        placeholder="Iphone XS..."
        placeholderTextColor="rgba(0,0,0,.3)"
        leftIcon={<Icon name="pricetag-outline" size={20} color="rgba(0,0,0,.3)" />}
        defaultValue={nombre}
        value={nombre}
        onChangeText={text => onChangeHandler(text, 'nombre')}
      />
      {/* picker*/}
      <View style={{marginLeft: 10}}>
        <Text>Categoria</Text>
        <Picker
          style={{color: '#000', backgroundColor: 'rgba(0,0,0,.1)'}}
          selectedValue={categoriaId}
          dropdownIconColor="#000"
          onValueChange={(itemValue, itemIndex) => onChangeHandler(itemValue, 'categoriaId')}>
          {categories.map((c, i) => (
            <Picker.Item key={i} color="#fff" label={c.nombre} value={c._id} />
          ))}
        </Picker>
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
      {img.length > 0 && <Image source={{uri: img}} style={{width: 200, height: 200}} />}
      <Text>{JSON.stringify(state, null, 5)}</Text>
    </ScrollView>
  );
};

export default AddProductScreen;

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
