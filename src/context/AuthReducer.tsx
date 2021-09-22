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

    default:
      return state;
  }
};
