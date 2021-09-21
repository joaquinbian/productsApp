import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Formik} from 'formik';
import {Input, Button} from 'react-native-elements';
import * as yup from 'yup';

interface initialValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const initialValues: initialValues = {
    email: '',
    password: '',
  };
  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(
        6,
        ({min}: {min: number}) =>
          `Password must have at least ${min} characters`,
      )
      .required(),
  });
  const {width} = useWindowDimensions();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
      validationSchema={loginSchema}>
      {({handleSubmit, handleChange, errors, isValid, handleBlur, touched}) => {
        // console.log(touched.email, 'soy el touched');
        console.log(isValid);

        return (
          <View
            style={{
              width: width * 0.7,
            }}>
            <Input
              placeholder="email"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')} //le da valor al touched, sino es undefined
              label="Email"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
              errorMessage={touched.email ? errors.email : undefined}
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
            />
            {/* 
                el touched lo agregamos porque sino, cuando cambia cualquiera de los inputs,
                se ejecuta la validacion de este igual aunque no estemos aca y se muestra el
                error, y no queda lindo
            */}
            <Button title="submit" onPress={handleSubmit} disabled={!isValid} />
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
});
