import {useState} from 'react';

//T es un generico al cual le decimos que va  aser un objeto,
//y lo que nosotros le pasamos al useForm va a ser un obj
//por eso le decimos que el tipo del initialState, que va a
//ser el obj que enviamos nosotros es de tipo T

export const useForm = <T extends Object>(initialState: T) => {
  const [state, setState] = useState(initialState);

  const onChangeHandler = (text: string, field: keyof T) => {
    setState({
      ...state,
      [field]: text,
    });
  };
  const onChangeSwitchHandler = (val: boolean, field: keyof T) => {
    setState({
      ...state,
      [field]: val,
    });
  };

  return {
    ...state,
    state,
    onChangeHandler,
    onChangeSwitchHandler,
  };
};
