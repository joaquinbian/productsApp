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
  const {width} = useWindowDimensions();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log(values)}>
      {({handleSubmit, handleChange}) => {
        return (
          <View
            style={{
              width: width * 0.7,
            }}>
            <Input
              placeholder="email"
              placeholderTextColor="#fff"
              onChangeText={handleChange('email')}
              label="Email"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
            />
            <Input
              placeholder="password"
              placeholderTextColor="#fff"
              onChangeText={handleChange('password')}
              label="Password"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
            />
            <Button title="submit" onPress={handleSubmit} />
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
