import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import React, {useContext} from 'react';
import Home from '../screens/Home';
import Register from '../screens/Register';
import {AuthContext} from '../context/AuthContext';
import LoadingScreen from '../screens/LoadingScreen';

export type RootStackParams = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};
const StackNavigator = () => {
  const Stack = createStackNavigator<RootStackParams>();
  const {state} = useContext(AuthContext);
  const {status} = state;

  if (status === 'checking') return <LoadingScreen />;

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* mostramos condicionalemente las pantallas dependiendo
          del estado del usuario, entonces cuando el usuario
          esta autenticado, es como que no existen esas rutas
      */}

      {status === 'authenticated' ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
