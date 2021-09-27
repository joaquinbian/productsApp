import {Usuario} from '../interfaces/authInterface';
import {AuthState, Message} from './AuthContext';

type ActionType =
  | {type: 'signUp'; payload: {token: string; user: Usuario}}
  | {type: 'addMsg'; payload: Message}
  | {type: 'removeMsg'; payload: Message}
  | {type: 'notAuthenticated'}
  | {type: 'logOut'};

export const authReducer = (state: AuthState, action: ActionType): AuthState => {
  switch (action.type) {
    case 'addMsg':
      return {
        ...state,
        // errorMessage: action.payload,
        message: action.payload,
        user: null,
        token: null,
        status: 'not-authenticated',
      };
    case 'removeMsg':
      // console.log('me ejecutoooo');

      return {
        ...state,
        message: action.payload, //acá sacamos el mensaje, para que quede limpio
      };
    case 'signUp':
      const {token, user} = action.payload;
      return {
        ...state,
        user,
        token,
        status: 'authenticated',
      };
    case 'notAuthenticated': //como hace lo mismo que el logout, lo dejamos así
    // indicandole que hagan lo mismo
    case 'logOut':
      return {
        ...state,
        user: null,
        token: null,
        status: 'not-authenticated',
      };
    default:
      return state;
  }
};
