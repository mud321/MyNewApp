// // // import React, { useEffect, useState } from 'react';
// // // import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

// // // const VendorDashboardScreen = () => {
// // //   const [orders, setOrders] = useState([]);

// // //   useEffect(() => {
// // //     // In the next step, this will be replaced with real-time Firestore data
// // //     setOrders([
// // //       { id: '1', customer: 'Ali', status: 'Pending' },
// // //       { id: '2', customer: 'Zara', status: 'In Progress' },
// // //     ]);
// // //   }, []);

// // //   const handleStatusChange = (orderId, newStatus) => {
// // //     setOrders(prev =>
// // //       prev.map(order =>
// // //         order.id === orderId ? { ...order, status: newStatus } : order
// // //       )
// // //     );
// // //     Alert.alert('Updated', `Order marked as ${newStatus}`);
// // //   };

// // //   const renderItem = ({ item }) => (
// // //     <View style={styles.card}>
// // //       <Text style={styles.customer}>Customer: {item.customer}</Text>
// // //       <Text>Status: {item.status}</Text>

// // //       {item.status === 'Pending' && (
// // //         <View style={styles.buttonRow}>
// // //           <Button title="Accept" onPress={() => handleStatusChange(item.id, 'In Progress')} />
// // //           <Button title="Reject" color="red" onPress={() => handleStatusChange(item.id, 'Rejected')} />
// // //         </View>
// // //       )}

// // //       {item.status === 'In Progress' && (
// // //         <Button title="Mark as Completed" onPress={() => handleStatusChange(item.id, 'Completed')} />
// // //       )}
// // //     </View>
// // //   );

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.heading}>Vendor Dashboard</Text>
// // //       <FlatList
// // //         data={orders}
// // //         keyExtractor={(item) => item.id}
// // //         renderItem={renderItem}
// // //       />
// // //     </View>
// // //   );
// // // };

// // // export default VendorDashboardScreen;

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 16,
// // //     backgroundColor: '#fff'
// // //   },
// // //   heading: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     marginBottom: 12
// // //   },
// // //   card: {
// // //     borderWidth: 1,
// // //     borderColor: '#ccc',
// // //     padding: 14,
// // //     borderRadius: 8,
// // //     marginBottom: 10
// // //   },
// // //   customer: {
// // //     fontSize: 18,
// // //     marginBottom: 4
// // //   },
// // //   buttonRow: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     marginTop: 8
// // //   }
// // // });

// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
// // import { db } from '../firebase';
// // import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
// // import { getAuth } from 'firebase/auth';

// // const VendorDashboardScreen = () => {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     const auth = getAuth();
// //     const currentUser = auth.currentUser;

// //     if (!currentUser) return;

// //     const vendorId = currentUser.uid;
// //     const q = query(collection(db, 'orders'), where('vendorId', '==', vendorId));

// //     const unsubscribe = onSnapshot(q, snapshot => {
// //       const fetchedOrders = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setOrders(fetchedOrders);
// //     });

// //     return () => unsubscribe();
// //   }, []);

// //   const handleStatusChange = async (orderId, newStatus) => {
// //     try {
// //       const orderRef = doc(db, 'orders', orderId);
// //       await updateDoc(orderRef, { status: newStatus });
// //       Alert.alert('Updated', `Order marked as ${newStatus}`);
// //     } catch (error) {
// //       console.error("Error updating status:", error);
// //       Alert.alert("Error", "Could not update order status.");
// //     }
// //   };

// //   const renderItem = ({ item }) => (
// //     <View style={styles.card}>
// //       <Text style={styles.customer}>Customer: {item.customerName || 'N/A'}</Text>
// //       <Text>Status: {item.status}</Text>

// //       {item.status === 'Pending' && (
// //         <View style={styles.buttonRow}>
// //           <Button title="Accept" onPress={() => handleStatusChange(item.id, 'In Progress')} />
// //           <Button title="Reject" color="red" onPress={() => handleStatusChange(item.id, 'Rejected')} />
// //         </View>
// //       )}

// //       {item.status === 'In Progress' && (
// //         <Button title="Mark as Completed" onPress={() => handleStatusChange(item.id, 'Completed')} />
// //       )}
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Vendor Dashboard</Text>
// //       <FlatList
// //         data={orders}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderItem}
// //       />
// //     </View>
// //   );
// // };

// // export default VendorDashboardScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: '#fff'
// //   },
// //   heading: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 12
// //   },
// //   card: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 14,
// //     borderRadius: 8,
// //     marginBottom: 10
// //   },
// //   customer: {
// //     fontSize: 18,
// //     marginBottom: 4
// //   },
// //   buttonRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 8
// //   }
// // });
// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, FlatList } from 'react-native';
// // import { getAuth } from 'firebase/auth';
// // import { db } from '../firebase';
// // import { collection, query, where, onSnapshot } from 'firebase/firestore';

// // const UserOrdersScreen = () => {
// //   const [orders, setOrders] = useState([]);
// //   const auth = getAuth();
// //   const currentUser = auth.currentUser;

// //   useEffect(() => {
// //     if (!currentUser) return;

// //     const q = query(
// //       collection(db, 'orders'),
// //       where('userId', '==', currentUser.uid)
// //     );

// //     const unsubscribe = onSnapshot(q, snapshot => {
// //       const userOrders = snapshot.docs.map(doc => ({
// //         id: doc.id,
// //         ...doc.data()
// //       }));
// //       setOrders(userOrders);
// //     });

// //     return () => unsubscribe();
// //   }, [currentUser]);

// //   const renderItem = ({ item }) => (
// //     <View style={styles.card}>
// //       <Text style={styles.title}>Service: {item.serviceName || 'Laundry'}</Text>
// //       <Text>Status: {item.status}</Text>
// //       <Text>Price: ${item.price || 0}</Text>
// //       <Text>Vendor: {item.vendorName || 'N/A'}</Text>
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Your Orders</Text>
// //       <FlatList
// //         data={orders}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderItem}
// //         ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No Orders Found</Text>}
// //       />
// //     </View>
// //   );
// // };

// // export default UserOrdersScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: '#fff'
// //   },
// //   heading: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 12
// //   },
// //   card: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 14,
// //     borderRadius: 8,
// //     marginBottom: 10
// //   },
// //   title: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 6
// //   }
// // });
// // import React, { useState, useEffect } from 'react';
// // import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';

// // const VendorDashboardScreen = () => {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     setOrders([
// //       {
// //         id: 'order1',
// //         customerName: 'Ali Raza',
// //         status: 'Pending',
// //         service: 'Wash & Iron',
// //         price: 500,
// //         date: '2025-08-02'
// //       },
// //       {
// //         id: 'order2',
// //         customerName: 'Zara Khan',
// //         status: 'In Progress',
// //         service: 'Dry Cleaning',
// //         price: 800,
// //         date: '2025-08-01'
// //       },
// //       {
// //         id: 'order3',
// //         customerName: 'Ahmed Shah',
// //         status: 'Completed',
// //         service: 'Steam Press',
// //         price: 300,
// //         date: '2025-07-31'
// //       },
// //       {
// //         id: 'order4',
// //         customerName: 'Usman Bashir',
// //         status: 'Rejected',
// //         service: 'Wash Only',
// //         price: 200,
// //         date: '2025-08-01'
// //       }
// //     ]);
// //   }, []);

// //   const handleStatusChange = (orderId, newStatus) => {
// //     setOrders(prev =>
// //       prev.map(order =>
// //         order.id === orderId ? { ...order, status: newStatus } : order
// //       )
// //     );
// //     Alert.alert('Updated', `Order marked as ${newStatus}`);
// //   };

// //   const renderStatus = (status) => {
// //     const colorMap = {
// //       Pending: '#f0ad4e',
// //       'In Progress': '#0275d8',
// //       Completed: '#5cb85c',
// //       Rejected: '#d9534f'
// //     };
// //     return (
// //       <Text style={[styles.status, { backgroundColor: colorMap[status] || '#999' }]}>
// //         {status}
// //       </Text>
// //     );
// //   };

// //   const renderItem = ({ item }) => (
// //     <View style={styles.card}>
// //       <Text style={styles.customer}>Customer: {item.customerName}</Text>
// //       <Text>Service: {item.service}</Text>
// //       <Text>Price: Rs {item.price}</Text>
// //       <Text>Date: {item.date}</Text>
// //       {renderStatus(item.status)}

// //       {item.status === 'Pending' && (
// //         <View style={styles.buttonRow}>
// //           <Button title="Accept" onPress={() => handleStatusChange(item.id, 'In Progress')} />
// //           <Button title="Reject" color="red" onPress={() => handleStatusChange(item.id, 'Rejected')} />
// //         </View>
// //       )}

// //       {item.status === 'In Progress' && (
// //         <Button title="Mark as Completed" onPress={() => handleStatusChange(item.id, 'Completed')} />
// //       )}
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Vendor Dashboard</Text>
// //       <FlatList
// //         data={orders}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderItem}
// //       />
// //     </View>
// //   );
// // };

// // export default VendorDashboardScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: '#fff'
// //   },
// //   heading: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 12
// //   },
// //   card: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 14,
// //     borderRadius: 8,
// //     marginBottom: 10
// //   },
// //   customer: {
// //     fontSize: 18,
// //     marginBottom: 4
// //   },
// //   status: {
// //     color: 'white',
// //     paddingVertical: 4,
// //     paddingHorizontal: 10,
// //     borderRadius: 12,
// //     overflow: 'hidden',
// //     marginTop: 6,
// //     alignSelf: 'flex-start'
// //   },
// //   buttonRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 10
// //   }
// // });
// // import React, { useEffect, useState } from 'react';
// // import { View, Text, StyleSheet, FlatList, Button, Alert, Linking } from 'react-native';

// // const VendorDashboardScreen = () => {
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     // Mock data for testing UI
// //     setOrders([
// //       {
// //         id: 'order1',
// //         customerName: 'Ali Raza',
// //         phone: '0300-1234567',
// //         address: 'Street 5, Gulshan-e-Iqbal, Karachi',
// //         locationUrl: 'https://maps.google.com/?q=24.9137,67.0822',
// //         status: 'Pending',
// //         service: 'Wash & Iron',
// //         price: 500,
// //         date: '2025-08-02'
// //       },
// //       {
// //         id: 'order2',
// //         customerName: 'Zara Khan',
// //         phone: '0301-9876543',
// //         address: 'House 12, DHA Phase 6, Lahore',
// //         locationUrl: 'https://maps.google.com/?q=31.5204,74.3587',
// //         status: 'In Progress',
// //         service: 'Dry Cleaning',
// //         price: 800,
// //         date: '2025-08-01'
// //       },
// //       {
// //         id: 'order3',
// //         customerName: 'Ahmed Ali',
// //         phone: '0333-1112222',
// //         address: 'Bahria Town, Rawalpindi',
// //         locationUrl: 'https://maps.google.com/?q=33.5651,73.0169',
// //         status: 'Completed',
// //         service: 'Ironing Only',
// //         price: 300,
// //         date: '2025-07-30'
// //       },
// //       {
// //         id: 'order4',
// //         customerName: 'Sara Yousuf',
// //         phone: '0321-4445555',
// //         address: 'F-11, Islamabad',
// //         locationUrl: 'https://maps.google.com/?q=33.6941,73.0641',
// //         status: 'Rejected',
// //         service: 'Wash Only',
// //         price: 400,
// //         date: '2025-07-29'
// //       }
// //     ]);
// //   }, []);

// //   const handleStatusChange = (orderId, newStatus) => {
// //     setOrders(prev =>
// //       prev.map(order =>
// //         order.id === orderId ? { ...order, status: newStatus } : order
// //       )
// //     );
// //     Alert.alert('Updated', `Order marked as ${newStatus}`);
// //   };

// //   const renderItem = ({ item }) => (
// //     <View style={styles.card}>
// //       <Text style={styles.customer}>👤 {item.customerName}</Text>
// //       <Text>📞 {item.phone}</Text>
// //       <Text>📍 {item.address}</Text>
// //       <Text>🧺 Service: {item.service}</Text>
// //       <Text>💰 Rs {item.price}</Text>
// //       <Text>🗓️ Date: {item.date}</Text>
// //       <Text>Status: <Text style={styles[item.status.toLowerCase()]}>{item.status}</Text></Text>

// //       {item.locationUrl && (
// //         <Text
// //           style={styles.link}
// //           onPress={() => Linking.openURL(item.locationUrl)}
// //         >
// //           ➡️ Open in Maps
// //         </Text>
// //       )}

// //       {item.status === 'Pending' && (
// //         <View style={styles.buttonRow}>
// //           <Button title="Accept" onPress={() => handleStatusChange(item.id, 'In Progress')} />
// //           <Button title="Reject" color="red" onPress={() => handleStatusChange(item.id, 'Rejected')} />
// //         </View>
// //       )}

// //       {item.status === 'In Progress' && (
// //         <Button title="Mark as Completed" onPress={() => handleStatusChange(item.id, 'Completed')} />
// //       )}
// //     </View>
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Vendor Dashboard (Mock)</Text>
// //       <FlatList
// //         data={orders}
// //         keyExtractor={(item) => item.id}
// //         renderItem={renderItem}
// //       />
// //     </View>
// //   );
// // };

// // export default VendorDashboardScreen;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: '#fff'
// //   },
// //   heading: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 12
// //   },
// //   card: {
// //     borderWidth: 1,
// //     borderColor: '#ccc',
// //     padding: 14,
// //     borderRadius: 8,
// //     marginBottom: 14
// //   },
// //   customer: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     marginBottom: 4
// //   },
// //   buttonRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     marginTop: 10
// //   },
// //   link: {
// //     color: '#318CE7',
// //     marginTop: 4,
// //     textDecorationLine: 'underline'
// //   },
// //   pending: { color: '#FFA500' },
// //   'in progress': { color: '#007bff' },
// //   completed: { color: 'green' },
// //   rejected: { color: 'red' }
// // });
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, FlatList, Button, Alert, Linking } from 'react-native';
// import { db } from '../firebase';
// import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

// const VendorDashboardScreen = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
//       const fetchedOrders = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setOrders(fetchedOrders);
//     });

//     return () => unsub();
//   }, []);

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
//       Alert.alert('Updated', `Order marked as ${newStatus}`);
//     } catch (error) {
//       console.error('Error updating status: ', error);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.card}>
//       <Text style={styles.customer}>👤 {item.customerName}</Text>
//       <Text>📞 {item.phone}</Text>
//       <Text>📍 {item.address}</Text>
//       <Text>🧺 Service: {item.service}</Text>
//       <Text>💰 Rs {item.price}</Text>
//       <Text>🗓️ Date: {item.date}</Text>
//       <Text>
//         Status:{' '}
//         <Text style={styles[item.status?.toLowerCase()]}>
//           {item.status}
//         </Text>
//       </Text>

//       {item.locationUrl && (
//         <Text
//           style={styles.link}
//           onPress={() => Linking.openURL(item.locationUrl)}
//         >
//           ➡️ Open in Maps
//         </Text>
//       )}

//       {item.status === 'Pending' && (
//         <View style={styles.buttonRow}>
//           <Button
//             title="Accept"
//             onPress={() => handleStatusChange(item.id, 'In Progress')}
//           />
//           <Button
//             title="Reject"
//             color="red"
//             onPress={() => handleStatusChange(item.id, 'Rejected')}
//           />
//         </View>
//       )}

//       {item.status === 'In Progress' && (
//         <Button
//           title="Mark as Completed"
//           onPress={() => handleStatusChange(item.id, 'Completed')}
//         />
//       )}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Vendor Dashboard</Text>
//       <FlatList
//         data={orders}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default VendorDashboardScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff'
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 12
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 14,
//     borderRadius: 8,
//     marginBottom: 14
//   },
//   customer: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10
//   },
//   link: {
//     color: '#318CE7',
//     marginTop: 4,
//     textDecorationLine: 'underline'
//   },
//   pending: { color: '#FFA500' },
//   'in progress': { color: '#007bff' },
//   completed: { color: 'green' },
//   rejected: { color: 'red' }
// });
// VendorDashboardScreen.js
import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Pressable, 
  Linking, 
  Alert,
  RefreshControl 
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { db, auth } from "../firebase";
import { collection, onSnapshot, updateDoc, doc, query, orderBy } from "firebase/firestore";
import MapView, { Marker } from "react-native-maps";

const VendorDashboardScreen = ({ navigation }) => {
  const vendor = auth.currentUser;
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ sales: 0, earnings: 0, orders: 0, products: 0 });
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    console.log("🔧 Setting up Firebase listener for vendor dashboard...");
    
    // Real-time Firebase listener
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log(`📡 Real-time orders received: ${snapshot.size}`);
        
        const fetchedOrders = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Debug logging for each order
          console.log(`📋 Order ${doc.id}:`, {
            customerName: data.customerName,
            phone: data.phone,
            pickUpLocation: data.pickUpLocation,
            location: data.location,
            hasCustomerInfo: !!data.customerInfo
          });
          
          return {
            id: doc.id,
            ...data,
          };
        });
        
        setOrders([...fetchedOrders]);

        // Calculate stats
        const sales = fetchedOrders.reduce((sum, order) => sum + (order.total || 0), 0);
        const earnings = fetchedOrders
          .filter((order) => order.status === "Completed")
          .reduce((sum, order) => sum + (order.total || 0), 0);

        setStats({
          sales,
          earnings,
          orders: fetchedOrders.length,
          products: new Set(fetchedOrders.flatMap((order) => 
            order.cart?.map((item) => item.name) || []
          )).size,
        });
      },
      (error) => {
        console.error("❌ Firebase error:", error);
        Alert.alert("Connection Error", "Orders load nahi ho rahe. Internet check karein.");
      }
    );

    return () => {
      console.log("🔌 Firebase listener cleanup");
      unsubscribe();
    };
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      console.log(`🔄 Status update: ${orderId} -> ${status}`);
      await updateDoc(doc(db, "orders", orderId), { 
        status,
        updatedAt: new Date()
      });
      Alert.alert("✅ Updated", `Order ${status} ho gaya!`);
    } catch (error) {
      console.error("❌ Update error:", error);
      Alert.alert("❌ Error", "Status update nahi hua. Phir try karein.");
    }
  };

  const handleCall = (phone) => {
    console.log("📞 Calling:", phone);
    if (phone && phone.trim() && phone !== "Not provided") {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      if (cleanPhone.length >= 10) {
        Linking.openURL(`tel:${cleanPhone}`)
          .catch(() => Alert.alert("Error", "Call nahi ho saki"));
      } else {
        Alert.alert("Invalid Number", "Phone number correct nahi hai");
      }
    } else {
      Alert.alert("No Phone", "Customer ka phone number nahi hai");
    }
  };

  const handleOpenMap = (address, location) => {
    console.log("🗺️ Opening map:", { address, location });
    
    // Try coordinates first (multiple formats)
    if (location?.lat && location?.lng) {
      const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
      Linking.openURL(url).catch(() => Alert.alert("Error", "Maps nahi khul saka"));
    } 
    else if (location?.latitude && location?.longitude) {
      const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      Linking.openURL(url).catch(() => Alert.alert("Error", "Maps nahi khul saka"));
    }
    // Try address search
    else if (address && address.trim() && address !== "Address not provided") {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      Linking.openURL(url).catch(() => Alert.alert("Error", "Maps nahi khul saka"));
    } else {
      Alert.alert("No Location", "Customer ka address/location nahi hai");
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderOrder = ({ item }) => {
    // Extract customer info from multiple sources - YE MAIN FIX HAI
    const customerName = item.customerName || 
                        item.customerInfo?.name || 
                        item.customerInfo?.customerName || 
                        "Unknown Customer";
    
    const customerPhone = item.phone || 
                         item.customerInfo?.phoneNumber || 
                         item.customerInfo?.phone || 
                         "Not provided";
    
    const customerAddress = item.pickUpLocation || 
                           item.customerInfo?.address || 
                           item.address || 
                           "Address not provided";
    
    // Handle multiple coordinate formats
    const locationCoords = item.location || 
                          item.customerInfo?.coordinates || 
                          item.customerInfo?.location || 
                          null;
    
    // Check if location is valid
    const hasValidLocation = locationCoords && (
      (locationCoords.lat && locationCoords.lng) || 
      (locationCoords.latitude && locationCoords.longitude)
    );
    
    const hasValidPhone = customerPhone && 
                         customerPhone !== "Not provided" && 
                         customerPhone.trim().length >= 10;
    
    const hasValidAddress = customerAddress && 
                           customerAddress !== "Address not provided" && 
                           customerAddress.trim().length > 0;

    // Order items
    const orderItems = item.cart || [];
    
    console.log(`🔍 Rendering order ${item.id}:`, {
      customerName,
      customerPhone,
      customerAddress,
      hasValidLocation,
      hasValidPhone,
      hasValidAddress
    });

    return (
      <View style={styles.orderCard}>
        {/* Order Header */}
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.orderId}>#{item.id.slice(0, 8)}</Text>
            <Text style={styles.orderDate}>
              {item.pickUpDate || new Date().toDateString()}
            </Text>
          </View>
          <View style={styles.priceSection}>
            <Text style={styles.orderTotal}>Rs {item.total || 0}</Text>
            <Text style={[styles.status, styles[item.status?.toLowerCase() || 'pending']]}>
              {item.status || "Pending"}
            </Text>
          </View>
        </View>

        {/* Customer Information - MAIN FIX SECTION */}
        <View style={styles.customerSection}>
          <Text style={styles.sectionTitle}>👤 Customer Information</Text>
          
          <View style={styles.customerInfo}>
            {/* Customer Name */}
            <View style={styles.infoRow}>
              <Ionicons name="person" size={18} color="#318CE7" />
              <Text style={styles.customerName}>{customerName}</Text>
            </View>
            
            {/* Phone Number */}
            {hasValidPhone ? (
              <TouchableOpacity 
                style={styles.infoRow}
                onPress={() => handleCall(customerPhone)}
              >
                <Ionicons name="call" size={18} color="#4CAF50" />
                <Text style={[styles.contactInfo, { color: "#4CAF50" }]}>
                  📞 {customerPhone} (Tap to call)
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.infoRow}>
                <Ionicons name="call-outline" size={18} color="#999" />
                <Text style={[styles.contactInfo, { color: "#999" }]}>
                  📞 Phone number nahi hai
                </Text>
              </View>
            )}
            
            {/* Address */}
            {hasValidAddress ? (
              <TouchableOpacity 
                style={styles.infoRow}
                onPress={() => handleOpenMap(customerAddress, locationCoords)}
              >
                <Ionicons name="location" size={18} color="#2196F3" />
                <Text style={[styles.contactInfo, { color: "#2196F3", flex: 1 }]} numberOfLines={3}>
                  📍 {customerAddress} (Tap for map)
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.infoRow}>
                <Ionicons name="location-outline" size={18} color="#999" />
                <Text style={[styles.contactInfo, { color: "#999" }]}>
                  📍 Address nahi hai
                </Text>
              </View>
            )}
          </View>

          {/* Mini Map */}
          {hasValidLocation && (
            <View style={styles.mapContainer}>
              <Text style={styles.mapTitle}>Customer Location:</Text>
              <MapView
                style={styles.miniMap}
                initialRegion={{
                  latitude: locationCoords.lat || locationCoords.latitude,
                  longitude: locationCoords.lng || locationCoords.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: locationCoords.lat || locationCoords.latitude,
                    longitude: locationCoords.lng || locationCoords.longitude,
                  }}
                  title="Customer Location"
                  description={customerAddress}
                  pinColor="#FF0000"
                />
              </MapView>
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => handleOpenMap(customerAddress, locationCoords)}
              >
                <Ionicons name="map" size={16} color="white" />
                <Text style={styles.mapButtonText}>Google Maps mein kholein</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Order Items */}
        <View style={styles.orderItems}>
          <Text style={styles.sectionTitle}>📋 Order Items:</Text>
          {orderItems.map((cartItem, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.itemName}>{cartItem.name || "Item"}</Text>
              <Text style={styles.itemDetails}>
                {cartItem.quantity || 1} × Rs{cartItem.price || 0} = Rs{(cartItem.quantity || 1) * (cartItem.price || 0)}
              </Text>
            </View>
          ))}
        </View>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <Text style={styles.sectionTitle}>📝 Order Details:</Text>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={16} color="#666" />
            <Text style={styles.detailText}>Pickup Date: {item.pickUpDate || "Not set"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.detailText}>Time: {item.selectedTime || "Not set"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="car" size={16} color="#666" />
            <Text style={styles.detailText}>Delivery: {item.delivery || "Not set"}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        {(!item.status || item.status === "Pending") && (
          <View style={styles.actionButtons}>
            <Pressable
              style={[styles.actionBtn, { backgroundColor: "#4CAF50" }]}
              onPress={() => updateOrderStatus(item.id, "Accepted")}
            >
              <Text style={styles.actionBtnText}>✅ Accept Order</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, { backgroundColor: "#f44336" }]}
              onPress={() => updateOrderStatus(item.id, "Rejected")}
            >
              <Text style={styles.actionBtnText}>❌ Reject Order</Text>
            </Pressable>
          </View>
        )}

        {item.status === "Accepted" && (
          <Pressable
            style={[styles.singleActionBtn, { backgroundColor: "#2196F3" }]}
            onPress={() => updateOrderStatus(item.id, "Completed")}
          >
            <Text style={styles.actionBtnText}>✅ Mark as Completed</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Assalam o Alaikum, {vendor?.email?.split("@")[0] || "Vendor"}</Text>
          <Text style={styles.date}>{new Date().toDateString()}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={42} color="#318CE7" />
        </TouchableOpacity>
      </View>

      {/* Analytics */}
      <View style={styles.analytics}>
        <View style={styles.statCard}>
          <FontAwesome5 name="rupee-sign" size={20} color="#318CE7" />
          <Text style={styles.statValue}>Rs{stats.sales.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Total Sales</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="account-balance-wallet" size={20} color="green" />
          <Text style={styles.statValue}>Rs{stats.earnings.toFixed(0)}</Text>
          <Text style={styles.statLabel}>Earnings</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="cart-outline" size={20} color="#ff9800" />
          <Text style={styles.statValue}>{stats.orders}</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statCard}>
          <Ionicons name="cube-outline" size={20} color="#9c27b0" />
          <Text style={styles.statValue}>{stats.products}</Text>
          <Text style={styles.statLabel}>Items</Text>
        </View>
      </View>

      {/* Orders List */}
      <View style={styles.ordersHeader}>
        <Text style={styles.sectionTitle}>Recent Orders ({orders.length})</Text>
      </View>
      
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Abhi koi orders nahi hain</Text>
            <Text style={styles.emptySubText}>Jab customers orders place karenge to yahan dikhenge</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default VendorDashboardScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 2,
  },
  welcome: { fontSize: 18, fontWeight: "bold", color: "#333" },
  date: { fontSize: 14, color: "#666", marginTop: 2 },
  
  analytics: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 12,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
  },
  statValue: { fontSize: 16, fontWeight: "bold", marginTop: 4, color: "#333" },
  statLabel: { fontSize: 11, color: "#666", marginTop: 2 },
  
  ordersHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  
  orderCard: {
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 14,
    borderRadius: 10,
    elevation: 2,
  },
  
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  orderId: { fontSize: 16, fontWeight: "bold", color: "#333" },
  orderDate: { fontSize: 12, color: "#666", marginTop: 2 },
  priceSection: { alignItems: "flex-end" },
  orderTotal: { fontSize: 16, fontWeight: "bold", color: "#4CAF50" },
  status: { 
    fontSize: 11, 
    fontWeight: "600", 
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    textAlign: "center",
  },
  pending: { backgroundColor: "#FFF3CD", color: "#856404" },
  accepted: { backgroundColor: "#D1ECF1", color: "#0C5460" },
  completed: { backgroundColor: "#D4EDDA", color: "#155724" },
  rejected: { backgroundColor: "#F8D7DA", color: "#721C24" },
  
  customerSection: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  customerInfo: { gap: 8 },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  customerName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  contactInfo: {
    fontSize: 13,
    fontWeight: "500",
  },
  
  mapContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  mapTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    marginBottom: 5,
  },
  miniMap: { height: 100 },
  mapButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  mapButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  
  orderItems: { marginBottom: 10 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  itemName: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    fontWeight: "500",
  },
  itemDetails: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
  },
  
  orderDetails: { marginBottom: 12 },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: "#555",
  },
  
  actionButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  singleActionBtn: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  actionBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  
  emptyState: {
    alignItems: "center",
    marginTop: 50,
    paddingHorizontal: 30,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});