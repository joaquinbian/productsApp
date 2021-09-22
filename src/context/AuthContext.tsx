import React, {createContext, useReducer} from 'react';
import {Usuario, LoginResponse, LoginData} from '../interfaces/authInterface';
import {authReducer} from './AuthReducer';
import productsApi from '../api/productsApi';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export interface AuthState {
  errorMessage: string;
  user: Usuario | null;
  token: string | null;
  status: 'checking' | 'authorized' | 'not-authorized'; //cuando estemos viendo el token
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
};

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({children}: Props) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const removeError = () => {};

  const signIn = async ({correo, password}: LoginData) => {
    // console.log(validData);

    try {
      const response = await productsApi.post<LoginResponse>('/auth/login', {correo, password});
      console.log(response.data, 'soy la response');
    } catch (err) {
      console.log({err});
    }
  };

  const signUp = () => {};
  const logIn = () => {};
  const data: AuthContextType = {
    state,
    removeError,
    signIn,
    signUp,
    logIn,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
