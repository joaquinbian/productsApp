import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import ReactLogo from '../components/ReactLogo';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  return (
    //Tambien en lugar de un KeyboardAvoidingView podemos usar un ScrollView
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7472F3',
      }}>
      <ReactLogo title="Register" />
      <RegisterForm />
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
  },
});
