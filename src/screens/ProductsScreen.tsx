import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {ProductsContext} from '../context/ProductsContext';
import {StackScreenProps} from '@react-navigation/stack';
import {Producto} from '../interfaces/authInterface';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> {}
const ProductsScreen = ({navigation}: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {state: productsState, loadProducts, deleteProduct} = useContext(ProductsContext);
  const {state} = useContext(AuthContext);
  const {user} = state;
  const {message, products} = productsState;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="add"
          containerStyle={{marginRight: 10}}
          buttonStyle={{width: 70, height: 40, backgroundColor: '#7472F3'}}
          onPress={() => navigation.navigate('AddProductScreen', {})} //el id no me lo pide pq puede ser undefined
        />
      ),
    });
  }, []);
  const setOnRefresh = () => {
    setIsRefreshing(true);
    loadProducts().then(() => {
      setIsRefreshing(false);
    });
  };
  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlatList
        data={products}
        renderItem={({item}: {item: Producto}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductScreen', {id: item._id, name: item.nombre})}
            activeOpacity={0.8}
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>{item.nombre}</Text>
            <View style={{flexDirection: 'row'}}>
              {user?.rol === 'ADMIN_ROLE' ? (
                <TouchableOpacity onPress={() => deleteProduct(item._id)}>
                  <Icon name="trash-outline" size={20} style={{marginRight: 10}} color="red" />
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                onPress={() => navigation.navigate('AddProductScreen', {id: item._id, name: item.nombre})}>
                <Icon name="create-outline" size={20} style={{marginRight: 10}} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshControl={<RefreshControl onRefresh={setOnRefresh} refreshing={isRefreshing} />}
        // refreshing={isRefreshing} //nose porque no funciona con estos dos
        // onRefresh={setOnRefresh}
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
