import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {AuthContext} from '../context/AuthContext';

const Home = () => {
  const {state, logOut} = useContext(AuthContext);
  const {user, token} = state;

  return (
    <View style={styles.container}>
      <Button title="logout" buttonStyle={{backgroundColor: 'red', width: 150}} onPress={logOut} />
      <Text>{JSON.stringify(user, null, 5)}</Text>
      <Text>{token}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
