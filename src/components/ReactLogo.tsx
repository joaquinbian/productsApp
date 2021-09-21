import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  title?: string;
}
const ReactLogo = ({title}: Props) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={styles.img}
      />
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
};

export default ReactLogo;

const styles = StyleSheet.create({
  img: {
    height: 100,
    width: 110,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 5,
  },
});
