import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
        <Text style={styles.title}>Login</Text>
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
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
  },
});
