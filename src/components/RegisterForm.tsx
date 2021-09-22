import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, useWindowDimensions, Keyboard} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import {Input, Button} from 'react-native-elements';
import {Formik} from 'formik';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';

export interface initialValues {
  email: string;
  password: string;
  name: string;
}

const RegisterForm = () => {
  const [showPassowrd, setShowPassowrd] = useState(false);
  const {signIn} = useContext(AuthContext);
  const initialValues: initialValues = {
    email: '',
    password: '',
    name: '',
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(6, ({min}: {min: number}) => `Password must have at least ${min} characters`)
      .required(),
    name: yup
      .string()
      .min(8, min => `Name must have at least ${min} characters`)
      .required(),
  });
  const {width} = useWindowDimensions();

  //esta configuracion la hice para poder usar el replace

  const navigation = useNavigation<StackNavigationProp<RootStackParams, any>>();

  const onSubmit = (values: initialValues) => {
    console.log(values);
    // signIn(values);
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
            <Input
              placeholder="name"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')} //le da valor al touched, sino es undefined
              label="Name"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
              errorMessage={touched.name ? errors.name : undefined}
              inputStyle={{color: '#fff'}}
            />
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
              title="register"
              onPress={handleSubmit}
              disabled={!isValid}
              buttonStyle={{width: '70%', alignSelf: 'center'}}
              //   containerStyle={{marginTop: 15}}
            />
          </View>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;

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
