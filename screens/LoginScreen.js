import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  ActivityIndicator,
  ImageBackground,
  Image,
  Platform
} from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      } else {
        navigation.replace('Home');
      }
    });
    return unsubscribe;
  }, []);

  const login = () => {
    if (!email || !password) {
      alert('Please fill in both fields');
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User signed in:', userCredential.user);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/premium-vector/laundry-service-background-flat-design_98292-23487.jpg?w=740' // Laundry-themed background
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={{ marginRight: 10 }}>Loading</Text>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.card}>
              <Image
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/007/610/185/original/laundry-logo-design-template-emblem-concept-design-creative-symbol-icon-free-vector.jpg' }}
                style={styles.logo}
              />
              <Text style={styles.subtitle}>Login to Your Account</Text>

              <View style={styles.inputGroup}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#444" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  style={styles.input}
                  placeholderTextColor="#555"
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputGroup}>
                <Ionicons name="key-outline" size={24} color="#444" />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
                  style={styles.input}
                  placeholderTextColor="#555"
                />
              </View>

              <Pressable onPress={login} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>

              <Pressable onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
                <Text style={styles.registerText}>
                  Don't have an account? <Text style={{ color: '#318CE7' }}>Sign Up</Text>
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'contain'
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 4,
    fontWeight: '500'
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  input: {
    marginLeft: 12,
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000'
  },
  button: {
    backgroundColor: '#318CE7',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  registerText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#444',
    marginTop: 15
  }
});
