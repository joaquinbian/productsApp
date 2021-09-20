import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';

const Login = () => {
  const {height, width} = useWindowDimensions();
  return (
    <>
      <View
        style={{
          //   flex: 1,
          backgroundColor: 'red',
          height,
          width: width * 2,
          top: -70,
          left: -100,
          position: 'absolute',
          zIndex: 400,
          transform: [{rotate: '22deg'}],
        }}
      />
      <Text>Login screen</Text>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
