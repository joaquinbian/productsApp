import React, {createContext, useEffect, useState} from 'react';
import productsApi from '../api/productsApi';
import {Products, Producto} from '../interfaces/authInterface';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ProductsState {
  products: Producto[];
  loadProducts: () => Promise<void>; //promesa que no regresa nada
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (categoryId: string, productId: string, productName: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>; //es una promesa que resuleve un producto
  loadImage: (data: any, id: string) => Promise<void>;
}

export const ProductsContext = createContext({} as ProductsState);

const ProductsProvider = ({children}: Props) => {
  const [products, setProducts] = useState<Producto[]>([]);

  useEffect(() => {
    console.log('me monto el products');

    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await productsApi.get<Products>('/productos?limite=50');
    //esto lo hacemos asi por si hacemos un lazyload y tenemos que ir cargando
    //de a poco
    // setProducts([...products, ...response.data.productos]);
    setProducts([...response.data.productos]);
  };

  const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
    const response = await productsApi.post<Producto>('/productos', {
      categoria: categoryId,
      nombre: productName,
    });
    setProducts([...products, response.data]);
    return response.data; //para que pueda mostrar los botones de la camara, asi le seteamos el id
  };

  const updateProduct = async (categoryId: string, productId: string, productName: string) => {
    const response = await productsApi.put<Producto>(`/productos/${productId}`, {
      categoria: categoryId,
      nombre: productName,
    });
    setProducts(
      products.map(p => {
        return p._id === productId ? response.data : p;
      }),
    );
  };

  const deleteProduct = async (id: string) => {};

  const loadProductById = async (id: string): Promise<Producto> => {
    const myProduct = await productsApi.get<Producto>(`/productos/${id}`);
    console.log(myProduct.data, 'aca');

    return myProduct.data;
  };
  const loadImage = async (data: any, id: string) => {};

  const data: ProductsState = {
    products,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    loadProductById,
    loadImage,
  };
  return <ProductsContext.Provider value={data}>{children}</ProductsContext.Provider>;
};
export default ProductsProvider;
