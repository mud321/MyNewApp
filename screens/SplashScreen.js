import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Login'); // Navigate to Login or Home
    }, 3000); // 4 seconds

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/loundary.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>DhobiXpress</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F1F9',
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation: {
    width: 200,
    height: 200
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#318CE7',
    marginTop: 20,
    fontFamily: 'sans-serif-medium'
  }
});
