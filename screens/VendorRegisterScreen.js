import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const VendorRegisterScreen = ({ navigation }) => {
  const [vendorName, setVendorName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleRegister = async () => {
    if (!vendorName || !businessName || !email || !password || !phone || !address) {
      Alert.alert("All fields are required!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const vendor = userCredential.user;

      await setDoc(doc(db, 'vendors', vendor.uid), {
        vendorName,
        businessName,
        email,
        phone,
        address,
        role: 'vendor',
        createdAt: new Date(),
      });

      Alert.alert("Success", "Vendor registered!");
      navigation.replace('VendorLogin');
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Vendor Registration</Text>

      <TextInput
        style={styles.input}
        placeholder="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
      />
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <Button title="Register Vendor" onPress={handleRegister} />

      <View style={styles.loginLink}>
        <Button
          title="Already have an account? Login"
          onPress={() => navigation.navigate('VendorLogin')}
        />
      </View>
    </ScrollView>
  );
};

export default VendorRegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },
  loginLink: {
    marginTop: 12
  }
});
