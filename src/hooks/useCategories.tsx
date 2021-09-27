import React, {useEffect, useRef, useState} from 'react';
import productsApi from '../api/productsApi';
import {Categoria, Categories} from '../interfaces/authInterface';
export const useCategories = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const isMounted = useRef(true);

  const fetchCategories = async () => {
    const myCategories = await productsApi.get<Categories>('/categorias');
    const {categorias} = myCategories.data;
    setCategories(categorias);
  };

  useEffect(() => {
    if (isMounted.current) {
      fetchCategories();
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  return {
    categories,
  };
};
