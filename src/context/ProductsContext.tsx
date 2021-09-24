import React, {createContext, useState} from 'react';
import {Products} from '../interfaces/authInterface';

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ProductsState {
  products: Products[];
  loadProducts: () => Promise<void>; //promesa que no regresa nada
  addProduct: (categoryId: string, productName: string) => Promise<void>;
  updateProduct: (categoryId: string, productId: string, productName: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Products>;
  loadImage: (data: any, id: string) => Promise<void>;
}

const ProductsContext = createContext({} as ProductsState);

const ProductsProvider = ({children}: Props) => {
  const [products, setProducts] = useState<Products[]>([]);

  const loadProducts = async () => {};
  const addProduct = async (categoryId: string, productName: string) => {};
  const updateProduct = async (categoryId: string, productId: string, productName: string) => {};
  const deleteProduct = async (id: string) => {};
  const loadProductById = async (id: string) => {
    throw new Error();
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
