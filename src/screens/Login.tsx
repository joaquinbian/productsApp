import {StackScreenProps} from '@react-navigation/stack';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, useWindowDimensions, TouchableOpacity} from 'react-native';
import {Image} from 'react-native-elements';
import Toast from 'react-native-toast-message';
import Background from '../components/Background';
import LoginForm from '../components/LoginForm';
import ReactLogo from '../components/ReactLogo';
import {AuthContext} from '../context/AuthContext';
interface Props extends StackScreenProps<any, any> {}
const Login = ({navigation}: Props) => {
  const {state, removeMsg} = useContext(AuthContext);
  const {message} = state;
  const [isAlertShowing, setIsAlertShowing] = useState(false);

  const alertHide = () => {
    removeMsg();
    setIsAlertShowing(false);
  };

  useEffect(() => {
    if (message.type) {
      Toast.show({
        type: message.type,
        text1: message.message,
        visibilityTime: 1000,
        onHide: alertHide,
        onShow: () => setIsAlertShowing(true),
      });
    }
    return () => {
      removeMsg();
    };
  }, [message.message]);

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
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginTop: 10, alignSelf: 'flex-end', marginRight: 35}}
          onPress={() => (!isAlertShowing ? navigation.replace('Register') : null)}>
          <Text style={styles.newAccountLink}>New account</Text>
        </TouchableOpacity>
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
    color: '#fff',
  },
});
