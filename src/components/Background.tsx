import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';

const Background = () => {
  const {height, width} = useWindowDimensions();
  return (
    <View
      style={{
        //   flex: 1,
        height,
        width: width * 2,
        ...styles.background,
      }}
    />
  );
};

export default Background;

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#7472F3',
    top: -100,
    left: -100,
    position: 'absolute',
    zIndex: -100,
    transform: [{rotate: '20deg'}],
  },
});
