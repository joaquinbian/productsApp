import React, {useState} from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {Formik} from 'formik';
import {Input, Button} from 'react-native-elements';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface initialValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassowrd, setShowPassowrd] = useState(false);
  const initialValues: initialValues = {
    email: '',
    password: '',
  };
  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(
        6,
        ({min}: {min: number}) =>
          `Password must have at least ${min} characters`,
      )
      .required(),
  });
  const {width} = useWindowDimensions();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={values => console.log(values)}
      validationSchema={loginSchema}>
      {({handleSubmit, handleChange, errors, isValid, handleBlur, touched}) => {
        return (
          <View
            style={{
              width: width * 0.8,
            }}>
            <Input
              placeholder="email"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')} //le da valor al touched, sino es undefined
              label="Email"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
              errorMessage={touched.email ? errors.email : undefined}
              inputStyle={{color: '#fff'}}
              keyboardType="email-address"
            />

            <Input
              placeholder="password"
              placeholderTextColor="#rgba(255,255,255,0.5)"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              label="Password"
              labelStyle={styles.labelStyle}
              inputContainerStyle={styles.inputStyle}
              errorMessage={touched.password ? errors.password : undefined}
              secureTextEntry={!showPassowrd}
              inputStyle={{color: '#fff'}}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassowrd(!showPassowrd)}
                  activeOpacity={0.8}>
                  <Icon
                    name={showPassowrd ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={'rgba(255,255,255,.5)'}
                  />
                </TouchableOpacity>
              }
            />
            {/* 
                el touched lo agregamos porque sino, cuando cambia cualquiera de los inputs,
                se ejecuta la validacion de este igual aunque no estemos aca y se muestra el
                error, y no queda lindo
            */}

            <Button
              title="submit"
              onPress={handleSubmit}
              disabled={!isValid}
              buttonStyle={{width: '70%', alignSelf: 'center'}}
              //   containerStyle={{marginTop: 15}}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{marginTop: 10}}
              onPress={() => console.log('hola')}>
              <Text style={styles.newAccountLink}>New account</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  inputStyle: {
    borderColor: '#fff',
  },
  labelStyle: {
    color: '#fff',
  },
  newAccountLink: {
    alignSelf: 'flex-end',
    marginRight: 15,
    fontWeight: '300',
    fontSize: 12,
  },
});
