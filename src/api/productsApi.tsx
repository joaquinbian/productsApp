import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

//ejecutar hostname -I para saber la ip y cambiarla
//cuando cambias de red te dan otra ip
const baseURL = 'http://192.168.0.76:8080/api';

const productsApi = axios.create({baseURL});

//esto es como un middleware cada vez que se hace un request
//con esta api
productsApi.interceptors.request.use(
  //la config es la configutacion de las llamadas
  //el 2ndo argumento
  async config => {
    //tuve un error aca porque no le puse el await
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // console.log('este es el token', token);

      //ahora todas las peticiiones que hagamos con productsAPI
      //en el header van a tener el token
      config.headers['x-token'] = token;
    }
    return config;
  },
);
export default productsApi;
