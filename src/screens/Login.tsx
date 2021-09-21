import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Image} from 'react-native-elements';
import Background from '../components/Background';
import LoginForm from '../components/LoginForm';
import ReactLogo from '../components/ReactLogo';

const Login = () => {
  const {height, width} = useWindowDimensions();
  return (
    <>
      <Background />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ReactLogo />
        {/* <Text>Login screen</Text> */}
        <LoginForm />
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
