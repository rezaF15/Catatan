import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Lottie from 'lottie-react-native';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('home');
    }, 1800);
  }, []);

  return (
    <View style={styles.Container}>
      <Lottie
        style={styles.sa}
        source={require('./../../assets/image/Loading-2.json')}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  sa: {
    width: 250,
    alignSelf: 'center',
    marginTop: '50%',
  },
  Text: {
    marginTop: '50%',
    fontWeight: 'ZillaSlab-bold.ttf',
  },
});
