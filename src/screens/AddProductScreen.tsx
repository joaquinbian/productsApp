import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useCategories} from '../hooks/useCategories';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from '../hooks/useForm';

interface Props extends StackScreenProps<ProductsStackParams, 'AddProductScreen'> {}

const AddProductScreen = ({route, navigation}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const {categories} = useCategories();
  const {name, id} = route.params;
  const {_id, nombre, categoriaId, img, onChangeHandler, state} = useForm({
    _id: '',
    nombre: name,
    categoriaId: '',
    img: '',
  });

  useEffect(() => {
    if (name) {
      navigation.setOptions({title: name});
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Product name"
        placeholder="Iphone XS..."
        placeholderTextColor="rgba(0,0,0,.3)"
        // labelStyle={{color: '#000'}}
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
          selectedValue={selectedCategory}
          // itemStyle={{backgroundColor: '#fff'}}
          dropdownIconColor="#000"
          onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}>
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
