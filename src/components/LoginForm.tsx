import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View, TouchableOpacity, Keyboard, Alert} from 'react-native';
import {Formik} from 'formik';
import {Input, Button} from 'react-native-elements';
import * as yup from 'yup';
import Toast, {ToastShowOptions} from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {AuthContext} from '../context/AuthContext';

export interface initialValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassowrd, setShowPassowrd] = useState(false);
  const {signIn, state, removeError} = useContext(AuthContext);
  const {errorMessage} = state;

  const toast = useRef<ToastShowOptions>();
  const {width} = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParams, any>>();

  const initialValues: initialValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;
    else {
      console.log('me deberia ejecutar');
      Alert.alert('Error doing login', 'Please try again', [{text: 'Ok', onPress: removeError}]);
    }
  }, [errorMessage]);

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, ({min}: {min: number}) => `Password must have at least ${min} characters`)
      .required(),
  });

  //esta configuracion la hice para poder usar el replace

  const onSubmit = (values: initialValues) => {
    const validData = {
      correo: values.email,
      password: values.password,
    };
    signIn(validData);
    Keyboard.dismiss();
    // navigation.replace('Home');
  };
  return (
    <Formik initialValues={initialValues} onSubmit={values => onSubmit(values)} validationSchema={loginSchema}>
      {({handleSubmit, handleChange, errors, isValid, handleBlur, touched}) => {
        return (
          <View
            style={{
              width: width * 0.8,
            }}>
            {/* {errorMessage.length && <Toast ref={ref => Toast.setRef(ref)} />} */}
            <Input
              placeholder="email"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')} //le da valor al touched, sino es undefined
              label="Email"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
              errorMessage={touched.email ? errors.email : undefined}
              inputStyle={{color: '#fff'}}
              keyboardType="email-address"
            />

            <Input
              placeholder="password"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              label="Password"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
              errorMessage={touched.password ? errors.password : undefined}
              secureTextEntry={!showPassowrd}
              inputStyle={{color: '#fff'}}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassowrd(!showPassowrd)} activeOpacity={0.8}>
                  <Icon
                    name={showPassowrd ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={'rgba(255,255,255,.5)'}
                  />
                </TouchableOpacity>
              }
            />
            {/* 
                el touched lo agregamos porque sino, cuando cambia cualquiera de los inputs,
                se ejecuta la validacion de este igual aunque no estemos aca y se muestra el
                error, y no queda lindo
            */}

            <Button
              title="submit"
              onPress={handleSubmit}
              disabled={!isValid}
              buttonStyle={{width: '70%', alignSelf: 'center'}}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginTop: 10}}
              onPress={() => navigation.replace('Register')}>
              <Text style={styles.newAccountLink}>New account</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: '#fff',
  },
  labelStyle: {
    color: '#fff',
  },
  newAccountLink: {
    alignSelf: 'flex-end',
    marginRight: 15,
    fontWeight: '300',
    fontSize: 12,
  },
});
