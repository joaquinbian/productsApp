import React, {useContext, useEffect, useRef} from 'react';
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
  const {state, removeMsg} = useContext(AuthContext);
  const {message} = state;
  const isMounted = useRef(true);
  useEffect(() => {
    removeMsg();
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (message.type) {
        Toast.show({
          type: message.type,
          text1: message.message,
          visibilityTime: 1000,
          onHide: removeMsg,
        });
      }
    }
    return () => {
      isMounted.current = false;
      removeMsg();
    };
  }, [message.message]);
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
        // disabled={!message.type ? false : true}
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
