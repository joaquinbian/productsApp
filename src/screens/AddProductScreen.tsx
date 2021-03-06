import React, {useContext, useEffect, useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {useCategories} from '../hooks/useCategories';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {StackScreenProps} from '@react-navigation/stack';
import {useForm} from '../hooks/useForm';
import {ProductsContext} from '../context/ProductsContext';
import LoadingScreen from './LoadingScreen';
import Toast from 'react-native-toast-message';

interface Props extends StackScreenProps<ProductsStackParams, 'AddProductScreen'> {}

const AddProductScreen = ({route, navigation}: Props) => {
  const {categories} = useCategories();
  //le seteamos estos valores por defectos pq podemos tener problemas con q
  //vengan undefined
  const {name = '', id = ''} = route.params;
  const {
    state: productsState,
    loadProductById,
    addProduct,
    updateProduct,
    loadImage,
    removeMsg,
  } = useContext(ProductsContext);
  const {_id, nombre, categoriaId, img, onChangeHandler, state, setFormValues} = useForm({
    _id: '',
    nombre: name,
    categoriaId: '',
    img: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [tempImg, setTempImg] = useState<string>();
  const isMounted = useRef(true);

  const {message, products} = productsState;

  useEffect(() => {
    console.log('entre effect');
    console.log(message);

    if (message.type) {
      console.log('entre type');
      Toast.show({
        type: message.type,
        text1: message.message,
        visibilityTime: 1000,
        onHide: removeMsg,
      });
    }
    return () => {
      removeMsg();
    };
  }, [message.message]);

  useEffect(() => {
    if (name) {
      navigation.setOptions({title: name});
    }
  }, []);

  useEffect(() => {
    getProduct().then(() => {});
  }, []);

  const getProduct = async () => {
    try {
      const resp = await loadProductById(id);
      setFormValues({
        _id: id, //pq puede ser undefined
        categoriaId: resp.categoria._id,
        img: resp.img || '', //si pongo el signo de exclamaci??n en lugar de esto, se me rompe
        //???orque dice que img es undefined y en el estado no agrega esta propiedad
        //si lo dejo asi y no tiene una img, deja un string vacio
        nombre,
      });
    } catch (error) {
      console.log({error}, 'errro');
    }
  };

  const saveOrUpdate = async () => {
    //si existe el id es porque el producto ya existe,
    //osea que cuando apretemos save, estamos editando/actualizando
    //un producto, y la funcion a ejecutar es distinta
    if (id.length) {
      updateProduct(categoriaId, _id, nombre);
    } else {
      const tempCategory = categoriaId || categories[0]._id;
      const response = await addProduct(tempCategory, nombre);
      onChangeHandler(response._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera({quality: 0.5, mediaType: 'photo'}, response => {
      if (response.didCancel) return;
      if (!response.assets![0].uri) return;
      setTempImg(response.assets![0].uri);
      setIsLoading(true);
      loadImage(response, _id).then(resp => {
        setIsLoading(false);
        // console.log(resp, 'en el then');
        if (resp === 200) {
          return Toast.show({
            type: 'success',
            text1: 'image loaded successfully',
            visibilityTime: 1000,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'error loading image',
            text2: 'please try again',
            visibilityTime: 1000,
          });
        }
      });
    });
  };

  const takePhotoGallery = async () => {
    launchImageLibrary({quality: 0.5, mediaType: 'photo'}, response => {
      if (response.didCancel) return;
      if (!response.assets![0].uri) return;
      setTempImg(response.assets![0].uri);
      setIsLoading(true);
      loadImage(response, _id).then(resp => {
        setIsLoading(false);
        // console.log(resp, 'en el then');
        if (resp === 200) {
          return Toast.show({
            type: 'success',
            text1: 'image loaded successfully',
            visibilityTime: 1000,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'error loading image',
            text2: 'please try again',
            visibilityTime: 1000,
          });
        }
      });
    });
  };

  if (isLoading) return <LoadingScreen text="Loading product" />;
  return (
    <ScrollView style={styles.container}>
      <Toast ref={ref => Toast.setRef(ref)} style={{zIndex: 1000}} />
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
      <Button
        title="Save"
        containerStyle={{marginTop: 10}}
        buttonStyle={{backgroundColor: '#7472F3'}}
        onPress={saveOrUpdate}
      />
      {_id.length > 0 && (
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <Button
            title="Camera"
            containerStyle={{marginTop: 10}}
            buttonStyle={{backgroundColor: '#7472F3'}}
            iconRight
            icon={<Icon name="camera-outline" size={20} style={{marginLeft: 10, color: '#fff'}} />}
            onPress={takePhoto}
          />
          <Button
            title="Gallery"
            containerStyle={{marginTop: 10}}
            buttonStyle={{backgroundColor: '#7472F3'}}
            iconRight
            icon={<Icon name="image-outline" size={20} style={{marginLeft: 10, color: '#fff'}} />}
            onPress={takePhotoGallery}
          />
        </View>
      )}

      {img.length > 0 && !tempImg && <Image source={{uri: img}} style={styles.img} />}
      {tempImg && <Image source={{uri: tempImg}} style={styles.img} />}
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
  img: {
    width: '100%',
    height: 300,
    marginTop: 15,
  },
});
