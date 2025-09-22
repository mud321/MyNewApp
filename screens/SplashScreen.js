import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Don't auto navigate — allow user to choose
    }, 3000);

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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login as User</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VendorLogin')}>
          <Text style={styles.buttonText}>Login as Vendor</Text>
        </TouchableOpacity>
      </View>
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
  },
  buttonContainer: {
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#318CE7',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  }
});
