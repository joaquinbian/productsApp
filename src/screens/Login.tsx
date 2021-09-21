import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import Background from '../components/Background';
import LoginForm from '../components/LoginForm';
import ReactLogo from '../components/ReactLogo';

const Login = () => {
  const {height, width} = useWindowDimensions();
  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ReactLogo />
        <LoginForm />
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
