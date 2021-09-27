import React, {createContext, useEffect, useReducer, useState} from 'react';
import darkColors from 'react-native-elements/dist/config/colorsDark';
import {ImagePickerResponse} from 'react-native-image-picker';
import productsApi from '../api/productsApi';
import {Products, Producto} from '../interfaces/authInterface';
import {Message} from './AuthContext';
import {productsReducer} from './ProductsReducer';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface productsInitalState {
  products: Producto[];
  message: Message;
}

const productsState: productsInitalState = {
  products: [],
  message: {
    message: '',
    type: undefined,
  },
};

interface ProductsState {
  state: productsInitalState;
  loadProducts: () => Promise<void>; //promesa que no regresa nada
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (categoryId: string, productId: string, productName: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>; //es una promesa que resuleve un producto
  loadImage: (data: any, id: string) => Promise<string | number>;
  removeMsg: () => void;
}

export const ProductsContext = createContext({} as ProductsState);

const ProductsProvider = ({children}: Props) => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [state, dispatch] = useReducer(productsReducer, productsState);

  useEffect(() => {
    console.log('me monto el products');

    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsApi.get<Products>('/productos?limite=50');
      //de a poco
      //esto lo hacemos asi por si hacemos un lazyload y tenemos que ir cargando
      // console.log('response');
      return dispatch({type: 'loadProducts', payload: response.data.productos});
    } catch (error) {
      console.log({error}, 'error en loadProducts');
    }
  };

  const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
    const response = await productsApi.post<Producto>('/productos', {
      categoria: categoryId,
      nombre: productName,
    });
    // setProducts([...products, response.data]);
    dispatch({type: 'addProduct', payload: response.data});
    dispatch({type: 'addMsg', payload: {type: 'success', message: 'Product added successfully'}});
    return response.data; //para que pueda mostrar los botones de la camara, asi le seteamos el id
  };

  const updateProduct = async (categoryId: string, productId: string, productName: string) => {
    try {
      const response = await productsApi.put<Producto>(`/productos/${productId}`, {
        categoria: categoryId,
        nombre: productName,
      });
      dispatch({type: 'updateProduct', payload: {id: productId, newProduct: response.data}});
      return dispatch({type: 'addMsg', payload: {type: 'success', message: 'Product updated successfully'}});
    } catch (error) {
      return dispatch({type: 'addMsg', payload: {type: 'error', message: 'Error updating product'}});
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await productsApi.delete<Producto>(`/productos/${id}`);
      await loadProducts();
      return dispatch({type: 'addMsg', payload: {type: 'success', message: 'product deleted successfully'}});
      // return deletedProduct; //por si quieren impirmir un mensaje con el producto eliminado
    } catch (error) {
      console.log({error});
      return dispatch({type: 'addMsg', payload: {type: 'error', message: 'error deleting product'}});
    }
  };

  const loadProductById = async (id: string): Promise<Producto> => {
    const myProduct = await productsApi.get<Producto>(`/productos/${id}`);
    // console.log(myProduct.data, 'aca');

    return myProduct.data;
  };

  const loadImage = async (data: ImagePickerResponse, id: string) => {
    const {uri, fileName, type} = data.assets![0];
    const fileToUpload = {uri, name: fileName, type};
    const img = new FormData();
    img.append('archivo', fileToUpload);

    try {
      const resp = await productsApi.put<Producto>(`/uploads/productos/${id}`, img);
      console.log(resp);
      return resp.status; //retornamos el status
      //y alla decimos si es 200 q muestre tal cosa sino otra
    } catch (error) {
      console.log(error);
      return 'error';
    }
  };

  const removeMsg = () => {
    return dispatch({type: 'removeMsg'});
  };
  const data: ProductsState = {
    state,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    loadProductById,
    loadImage,
    removeMsg,
  };
  return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
};
export default ProductsProvider;
