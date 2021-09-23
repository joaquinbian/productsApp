import React, {useContext, useEffect} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import ReactLogo from '../components/ReactLogo';
import RegisterForm from '../components/RegisterForm';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';
import Toast from 'react-native-toast-message';
import {AuthContext} from '../context/AuthContext';

const Register = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, any>>();
  const {
    state: {errorMessage},
    removeError,
  } = useContext(AuthContext);
  useEffect(() => {
    if (errorMessage.length === 0) return;
    else {
      Toast.show({
        type: 'error',
        text1: errorMessage,
        text2: 'please try again',
        position: 'top',
        visibilityTime: 1500,
        onHide: removeError,
      });
    }
  }, [errorMessage]);
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
      <Toast ref={ref => Toast.setRef(ref)} />
      <Button
        title="Back"
        containerStyle={{
          position: 'absolute',
          backgroundColor: 'red',
          zIndex: 1000,
          top: 10,
          left: 15,
        }}
        buttonStyle={{backgroundColor: '#fff'}}
        titleStyle={{marginHorizontal: 5, color: '#4F4CF9'}}
        icon={<Icon name="chevron-back-outline" size={20} color="#4F4CF9" />}
        onPress={() => navigation.replace('Login')}
      />
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
