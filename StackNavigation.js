// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';
// import PickUpScreen from './screens/PickUpScreen';
// import CartScreen from './screens/CartScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import OrderScreen from './screens/OrderScreen';
// import SplashScreen from './screens/SplashScreen';

//     const StackNavigator = () => {
//         const Stack = createNativeStackNavigator();
//       return (
//         <NavigationContainer>
//           <Stack.Navigator  initialRouteName="Splash">
//           <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//           <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="PickUp" component={PickUpScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
//             <Stack.Screen name="Order" component={OrderScreen} options={{headerShown:false}}/>


//           </Stack.Navigator>
//         </NavigationContainer>
//       )
//     }
    
//     export default StackNavigator
    
//     const styles = StyleSheet.create({

//     })
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import existing user screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import PickUpScreen from './screens/PickUpScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';

// Import vendor screens
import VendorLoginScreen from './screens/VendorLoginScreen';
import VendorRegisterScreen from './screens/VendorRegisterScreen';
import VendorDashboardScreen from './screens/VendorDashboardScreen';
// import VendorProfileScreen from './screens/VendorProfileScreen';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">

        {/* Common Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        
        {/* User Screens */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="PickUp" component={PickUpScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />

        {/* Vendor Screens */}
        <Stack.Screen name="VendorLogin" component={VendorLoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VendorRegister" component={VendorRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="VendorProfile" component={VendorProfileScreen} /> */}

          {/* <Stack.Screen name="VendorProfile" component={VendorProfileScreen} options={{ title: 'My Profile' }}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
