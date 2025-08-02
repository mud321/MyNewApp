import { StyleSheet, Text, View, SafeAreaView, Pressable, Image } from 'react-native';
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(err => {
        console.log('Sign out error:', err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Profile Picture */}
        <Image
          source={{
            uri: user?.photoURL || 'https://i.pravatar.cc/300',
          }}
          style={styles.avatar}
        />

        {/* Welcome Text */}
        <Text style={styles.label}>Welcome Back 👋</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* Sign Out Button */}
        <Pressable onPress={signOutUser} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef3f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
    width: '85%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4b7bec',
  },
  label: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#ff4b5c',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  signOutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
