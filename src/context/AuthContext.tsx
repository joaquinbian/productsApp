import React, {createContext, useEffect, useReducer} from 'react';
import {Usuario, LoginResponse, LoginData, RegisterData} from '../interfaces/authInterface';
import {authReducer} from './AuthReducer';
import productsApi from '../api/productsApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../components/LoginForm';
import Toast from 'react-native-toast-message';

interface Props {
  children: JSX.Element | JSX.Element[];
}
type msgType = 'error' | 'success' | undefined;

export interface Message {
  type: msgType;
  message: string;
}
export interface AuthState {
  message: Message;
  user: Usuario | null;
  token: string | null;
  status: 'checking' | 'authenticated' | 'not-authenticated'; //cuando estemos viendo el token
}
const initialAuthState: AuthState = {
  message: {type: undefined, message: ''},
  user: null,
  token: null,
  status: 'checking',
};
type AuthContextType = {
  state: AuthState;
  removeMsg: () => void;
  signIn: (values: LoginData) => void;
  signUp: (values: RegisterData) => void;
  logOut: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    // console.log('me ejecuto, check token');

    const token = await AsyncStorage.getItem('token');
    // console.log(token);
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

  const removeMsg = () => {
    dispatch({type: 'removeMsg', payload: {type: undefined, message: ''}});
  };

  const signIn = async ({correo, password}: LoginData) => {
    // console.log(validData);

    try {
      const response = await productsApi.post<LoginResponse>('/auth/login', {correo, password});
      // console.log(response.data, 'soy la response');
      const {token, usuario} = response.data;

      dispatch({type: 'signUp', payload: {user: usuario, token}});
      await AsyncStorage.setItem('token', token);
    } catch (err) {
      // return dispatch({type: 'addError', payload: 'error doing login'});
      console.log(err, 'a');

      return dispatch({type: 'addMsg', payload: {type: 'error', message: 'error doing login'}});
    }
  };

  const signUp = async ({correo, password, nombre}: RegisterData) => {
    try {
      const response = await productsApi.post<LoginResponse>('/usuarios', {correo, password, nombre});
      const {token, usuario} = response.data;
      dispatch({type: 'addMsg', payload: {type: 'success', message: 'user registered'}});
      setTimeout(() => {
        dispatch({type: 'signUp', payload: {user: usuario, token}});
      }, 2000);
    } catch (error) {
      console.log(error.response);

      if (error.response.status === 400) {
        return dispatch({type: 'addMsg', payload: {type: 'error', message: 'this mail is already in use'}});
      } else {
        return dispatch({type: 'addMsg', payload: {type: 'error', message: 'error registering user'}});
      }
    }
  };

  const logIn = () => {};

  const logOut = async () => {
    //removemos el token
    await AsyncStorage.removeItem('token');
    //luego hacemos el logout
    dispatch({type: 'logOut'});
  };
  const data: AuthContextType = {
    state,
    removeMsg,
    signIn,
    signUp,
    logOut,
  };
  return (
    <AuthContext.Provider value={data}>
      <Toast ref={ref => Toast.setRef(ref)} />
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
