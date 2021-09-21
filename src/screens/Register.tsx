import React from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ReactLogo from '../components/ReactLogo';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const {height} = useWindowDimensions();
  return (
    //tambien se puede dejar el KeyboardAvoidingView pero
    //pongo esto para cambar y comparar
    <ScrollView
      style={{
        height,
        backgroundColor: '#7472F3',
      }}>
      <View
        style={{
          height,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ReactLogo />
        <Text style={styles.title}>Register</Text>

        <RegisterForm />
      </View>
    </ScrollView>
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
