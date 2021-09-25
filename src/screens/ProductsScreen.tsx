import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ProductsContext} from '../context/ProductsContext';
import {StackScreenProps} from '@react-navigation/stack';
import {Producto} from '../interfaces/authInterface';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {Button} from 'react-native-elements';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}
const ProductsScreen = ({navigation}: Props) => {
  const {products} = useContext(ProductsContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="add"
          containerStyle={{marginRight: 10}}
          buttonStyle={{width: 70, height: 40, backgroundColor: '#7472F3'}}
          onPress={() => navigation.navigate('AddProductScreen')} //el id no me lo pide pq puede ser undefined
        />
      ),
    });
  }, []);
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        renderItem={({item}: {item: Producto}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductScreen', {id: item._id, name: item.nombre})}
            activeOpacity={0.8}>
            <Text>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  itemSeparator: {
    borderColor: 'rgba(0,0,0,.1)',
    borderBottomWidth: 2,
    marginVertical: 5,
  },
});
