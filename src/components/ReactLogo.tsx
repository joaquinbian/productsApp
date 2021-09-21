import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ReactLogo = () => {
  return (
    <Image
      source={require('../assets/react-logo-white.png')}
      style={styles.img}
    />
  );
};

export default ReactLogo;

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 110,
  },
});
