import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
interface Props {
  text?: string;
}
const LoadingScreen = ({text}: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={35} color="#7472F3" />
      <Text>{text ? text : 'Loading'}</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
});
