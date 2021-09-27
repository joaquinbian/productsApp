import React from 'react';
import {act} from 'react-test-renderer';
import {Producto} from '../interfaces/authInterface';
import {Message} from './AuthContext';
import {productsInitalState} from './ProductsContext';

type actionsType =
  | {type: 'loadProducts'; payload: Producto[]}
  | {type: 'addProduct'; payload: Producto}
  | {type: 'updateProduct'; payload: {id: string; newProduct: Producto}}
  | {type: 'addMsg'; payload: Message}
  | {type: 'removeMsg'};

export const productsReducer = (state: productsInitalState, action: actionsType): productsInitalState => {
  switch (action.type) {
    case 'loadProducts':
      //   return [...action.payload];
      return {
        ...state,
        products: [...action.payload],
      };
    case 'addProduct':
      //   return [...state, action.payload];
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case 'updateProduct':
      //   return state.map(p =>  p._id === action.payload.id ? action.payload.newProduct : p);
      return {
        ...state,
        products: state.products.map(p => (p._id === action.payload.id ? action.payload.newProduct : p)),
      };
    case 'addMsg':
      return {
        ...state,
        message: action.payload,
      };
    case 'removeMsg':
      return {
        ...state,
        message: {type: undefined, message: ''},
      };
    default:
      return state;
  }
};
