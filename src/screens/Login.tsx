import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import Background from '../components/Background';
import LoginForm from '../components/LoginForm';
import ReactLogo from '../components/ReactLogo';
interface Props extends StackScreenProps<any, any> {}
const Login = ({navigation}: Props) => {
  const {height, width} = useWindowDimensions();

  return (
    <>
      <Background />
      <KeyboardAvoidingView
        enabled
        style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
