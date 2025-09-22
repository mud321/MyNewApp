// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase';

// const VendorLoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // ✅ Check if user is vendor
//       const userDoc = await getDoc(doc(db, 'users', user.uid));
//       if (userDoc.exists() && userDoc.data().role === 'vendor') {
//         navigation.replace('VendorDashboard');
//       } else {
//         Alert.alert("Access Denied", "You are not a vendor");
//       }
//     } catch (error) {
//       Alert.alert("Login Error", error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Vendor Login</Text>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// export default VendorLoginScreen;

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: { fontSize: 24, marginBottom: 20 },
//   input: { borderBottomWidth: 1, marginBottom: 15, padding: 8 }
// });
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const VendorLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('VendorDashboard');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vendor Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={() => Alert.alert('Forgot password feature coming soon')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title="Login" onPress={handleLogin} />

      <View style={styles.registerLink}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('VendorRegister')}>
          <Text style={styles.registerText}> Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default VendorLoginScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#318CE7',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  forgot: {
    color: '#318CE7',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 14,
  },
  registerLink: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#318CE7',
    fontWeight: 'bold',
    marginLeft: 6,
  },
});
