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
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/StackNavigator';

const Register = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams, any>>();
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
