import {Usuario} from '../interfaces/authInterface';
import {AuthState} from './AuthContext';

type ActionType =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logOut'};

export const authReducer = (state: AuthState, action: ActionType): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        user: null,
        token: null,
        status: 'not-authorized',
      };
    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };
    case 'signUp':
      const {token, user} = action.payload;
      return {
        ...state,
        errorMessage: '', //por si había un error
        user,
        token,
        status: 'authorized',
      };
    case 'notAuthenticated': //como hace lo mismo que el logout, lo dejamos así
    // indicandole que hagan lo mismo
    case 'logOut':
      return {
        ...state,
        user: null,
        token: null,
        status: 'not-authorized',
      };
    default:
      return state;
  }
};
