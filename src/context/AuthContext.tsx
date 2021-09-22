import React, {createContext} from 'react';
import {Usuario} from '../interfaces/authInterface';

interface Props {
  children: JSX.Element | JSX.Element[];
}
type AuthContextType = {
  errorMessage: string;
  user: Usuario | null;
  token: string | null;
  status: 'checking' | 'authorized' | 'not-authorized'; //cuando estemos viendo el token
  removeError: () => void;
  signIn: () => void;
  signUp: () => void;
  logIn: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({children}: Props) => {
  const data: AuthContextType = {};
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
