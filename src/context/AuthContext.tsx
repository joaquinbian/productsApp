import React, {createContext, useEffect, useReducer} from 'react';
import {Usuario, LoginResponse, LoginData} from '../interfaces/authInterface';
import {authReducer} from './AuthReducer';
import productsApi from '../api/productsApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface AuthState {
  errorMessage: string;
  user: Usuario | null;
  token: string | null;
  status: 'checking' | 'authenticated' | 'not-authenticated'; //cuando estemos viendo el token
}
const initialAuthState: AuthState = {
  errorMessage: '',
  user: null,
  token: null,
  status: 'checking',
};
type AuthContextType = {
  state: AuthState;
  removeError: () => void;
  signIn: (values: LoginData) => void;
  signUp: () => void;
  logIn: () => void;
  logOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);

    if (!token) return dispatch({type: 'notAuthenticated'});

    try {
      const response = await productsApi.get<LoginResponse>('/auth/');
      if (response.status !== 200) return dispatch({type: 'notAuthenticated'});
      else {
        return dispatch({
          type: 'signUp',
          payload: {
            user: response.data.usuario,
            token: response.data.token, //este token es un token nuevo, no es el token anterior
          },
        });
      }
    } catch (error) {
      console.log({error});
    }
  };

  const removeError = () => {
    dispatch({type: 'removeError'});
  };

  const signIn = async ({correo, password}: LoginData) => {
    // console.log(validData);

    try {
      const response = await productsApi.post<LoginResponse>('/auth/login', {correo, password});
      console.log(response.data, 'soy la response');
      const {token, usuario} = response.data;

      dispatch({type: 'signUp', payload: {user: usuario, token}});
      await AsyncStorage.setItem('token', token);
    } catch (err) {
      dispatch({type: 'addError', payload: 'error doing login'});
    }
  };

  const signUp = () => {};
  const logIn = () => {};
  const logOut = async () => {
    //removemos el token
    await AsyncStorage.removeItem('token');
    //luego hacemos el logout
    dispatch({type: 'logOut'});
  };
  const data: AuthContextType = {
    state,
    removeError,
    signIn,
    signUp,
    logIn,
    logOut,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
