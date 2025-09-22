// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Alert,
//   TextInput,
//   Pressable,
//   ImageBackground,
//   Image,
//   Platform
// } from 'react-native';
// import {
//   MaterialCommunityIcons,
//   Ionicons,
//   Feather
// } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { setDoc, doc } from 'firebase/firestore';
// import { auth, db } from '../firebase';

// const RegisterScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phone, setPhone] = useState('');
//   const navigation = useNavigation();

//   const register = () => {
//     if (email === '' || password === '' || phone === '') {
//       Alert.alert('Invalid Details', 'Please fill all the details');
//       return;
//     }

//     createUserWithEmailAndPassword(auth, email, password)
//       .then(async (userCredential) => {
//         const user = userCredential.user;
//         const myUserUid = user.uid;

//         await setDoc(doc(db, 'user', myUserUid), {
//           email: user.email,
//           phone: phone
//         });

//         Alert.alert('Success', 'Registration complete!');
//       })
//       .catch((error) => {
//         Alert.alert('Registration Error', error.message);
//       });
//   };

//   return (
//     <ImageBackground
//       source={{
//         uri: 'https://img.freepik.com/premium-vector/laundry-service-background-flat-design_98292-23487.jpg?w=740' // Laundry-themed background
//       }}
//       style={styles.background}
//       resizeMode="cover"
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//           <View style={styles.card}>
//             <Image
//               source={{
//                 uri: 'https://static.vecteezy.com/system/resources/previews/007/610/185/original/laundry-logo-design-template-emblem-concept-design-creative-symbol-icon-free-vector.jpg' // Replace with your Quick Wash logo
//               }}
//               style={styles.logo}
//             />
//             <Text style={styles.subtitle}>Create Your Laundry Account</Text>

//             <View style={styles.inputGroup}>
//               <MaterialCommunityIcons name="email-outline" size={24} color="#444" />
//               <TextInput
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="Email"
//                 style={styles.input}
//                 placeholderTextColor="#555"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Ionicons name="key-outline" size={24} color="#444" />
//               <TextInput
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Password"
//                 secureTextEntry
//                 style={styles.input}
//                 placeholderTextColor="#555"
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Feather name="phone" size={24} color="#444" />
//               <TextInput
//                 value={phone}
//                 onChangeText={setPhone}
//                 placeholder="Phone Number"
//                 style={styles.input}
//                 keyboardType="phone-pad"
//                 placeholderTextColor="#555"
//               />
//             </View>

//             <Pressable onPress={register} style={styles.button}>
//               <Text style={styles.buttonText}>Sign Up</Text>
//             </Pressable>

//             <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
//               <Text style={styles.loginText}>
//                 Already have an account? <Text style={{ color: '#318CE7' }}>Login</Text>
//               </Text>
//             </Pressable>
//           </View>
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     </ImageBackground>
//   );
// };

// export default RegisterScreen;

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%'
//   },
//   safeArea: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20
//   },
//   card: {
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     borderRadius: 15,
//     padding: 25,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     alignSelf: 'center',
//     marginBottom: 10,
//     resizeMode: 'contain'
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 20,
//     marginTop: 4,
//     fontWeight: '500'
//   },
//   inputGroup: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//     marginBottom: 20
//   },
//   input: {
//     marginLeft: 12,
//     flex: 1,
//     height: 40,
//     fontSize: 16,
//     color: '#000'
//   },
//   button: {
//     backgroundColor: '#318CE7',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 20
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600'
//   },
//   loginText: {
//     textAlign: 'center',
//     fontSize: 15,
//     color: '#444',
//     marginTop: 15
//   }
// });
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  Platform
} from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
  Feather
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const RegisterScreen = () => {
  const [name, setName] = useState("");   // ✅ Added name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const register = () => {
    if (name === "" || email === '' || password === '' || phone === '') {
      Alert.alert('Invalid Details', 'Please fill all the details');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const myUserUid = user.uid;

        // ✅ Save to Firestore
        await setDoc(doc(db, 'user', myUserUid), {
          name: name,
          email: user.email,
          phone: phone,
        });

        // ✅ Update Firebase Auth profile with displayName
        await updateProfile(user, { displayName: name });

        Alert.alert('Success', 'Registration complete!');
      })
      .catch((error) => {
        Alert.alert('Registration Error', error.message);
      });
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/premium-vector/laundry-service-background-flat-design_98292-23487.jpg?w=740'
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.card}>
            <Image
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/007/610/185/original/laundry-logo-design-template-emblem-concept-design-creative-symbol-icon-free-vector.jpg'
              }}
              style={styles.logo}
            />
            <Text style={styles.subtitle}>Create Your Laundry Account</Text>

            {/* ✅ Name Input */}
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons name="account-outline" size={24} color="#444" />
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                style={styles.input}
                placeholderTextColor="#555"
              />
            </View>

            <View style={styles.inputGroup}>
              <MaterialCommunityIcons name="email-outline" size={24} color="#444" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="#555"
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

            <View style={styles.inputGroup}>
              <Feather name="phone" size={24} color="#444" />
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone Number"
                style={styles.input}
                keyboardType="phone-pad"
                placeholderTextColor="#555"
              />
            </View>

            <Pressable onPress={register} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Login')} style={{ marginTop: 15 }}>
              <Text style={styles.loginText}>
                Already have an account? <Text style={{ color: '#318CE7' }}>Login</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

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
  loginText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#444',
    marginTop: 15
  }
});
