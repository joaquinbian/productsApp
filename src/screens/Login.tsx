import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useRef} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Image} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Background from '../components/Background';
import LoginForm from '../components/LoginForm';
import ReactLogo from '../components/ReactLogo';
import {AuthContext} from '../context/AuthContext';
interface Props extends StackScreenProps<any, any> {}
const Login = ({navigation}: Props) => {
  const {height, width} = useWindowDimensions();
  const {
    state: {errorMessage},
    removeError,
  } = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) return;
    else {
      Toast.show({
        type: 'error',
        text1: 'error doing login',
        text2: 'please try again',
        position: 'top',
        onHide: removeError,
        visibilityTime: 1500,
      });
    }
  }, [errorMessage]);

  return (
    <>
      <Toast ref={ref => Toast.setRef(ref)} />
      <Background />
      <KeyboardAvoidingView
        enabled
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ReactLogo title="Login" />
        <LoginForm />
      </KeyboardAvoidingView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  newAccountLink: {
    alignSelf: 'flex-end',
    marginRight: 15,
    fontWeight: '300',
    fontSize: 12,
  },
});
