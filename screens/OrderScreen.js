// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { auth, db } from "../firebase";
// import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

// const OrderScreen = () => {
//   const navigation = useNavigation();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!auth.currentUser) return;

//     const q = query(
//       collection(db, "orders"),
//       where("userId", "==", auth.currentUser.uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedOrders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setOrders(fetchedOrders);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Phone number open in dialer
//   const handleCall = (phone) => {
//     if (phone) {
//       Linking.openURL(`tel:${phone}`);
//     }
//   };

//   // Open address in Google Maps
//   const handleOpenMap = (address) => {
//     if (address) {
//       const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
//       Linking.openURL(url);
//     }
//   };

//   return (
//     <ScrollView style={{ padding: 16 }}>
//       <Text style={styles.heading}>Your Orders</Text>
//       {orders.length === 0 ? (
//         <Text>No orders found</Text>
//       ) : (
//         orders.map((order) => (
//           <View key={order.id} style={styles.orderCard}>
//             {order.cart?.map((item, index) => (
//               <Text key={index}>
//                 {item.name} x{item.quantity} - Rs{item.price * item.quantity}
//               </Text>
//             ))}

//             {/* Vendor Info */}
//             {order.vendorName && (
//               <Text style={{ marginTop: 6 }}>Vendor: {order.vendorName}</Text>
//             )}
//             {order.vendorPhone && (
//               <Text
//                 style={{ color: "blue", textDecorationLine: "underline" }}
//                 onPress={() => handleCall(order.vendorPhone)}
//               >
//                 Call Vendor: {order.vendorPhone}
//               </Text>
//             )}
//             {order.vendorAddress && (
//               <Text
//                 style={{ color: "blue", textDecorationLine: "underline" }}
//                 onPress={() => handleOpenMap(order.vendorAddress)}
//               >
//                 View Address on Map
//               </Text>
//             )}

//             {/* Order Details */}
//             <Text>Pickup Date: {order.pickUpDate}</Text>
//             <Text>Pickup Time: {order.selectedTime}</Text>
//             <Text>No. of Days: {order.no_Of_days}</Text>
//             <Text style={styles.total}>Total: Rs{order.total}</Text>
//             <Text style={styles.status}>
//               Status: <Text style={{ fontWeight: "bold" }}>{order.status || "Pending"}</Text>
//             </Text>
//           </View>
//         ))
//       )}
//       <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
//         <Text style={styles.buttonText}>Back to Home</Text>
//       </Pressable>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
//   orderCard: { backgroundColor: "#f5f5f5", padding: 12, borderRadius: 8, marginBottom: 12 },
//   total: { marginTop: 10, fontSize: 18, fontWeight: "bold" },
//   status: { marginTop: 5, color: "#088F8F" },
//   button: { backgroundColor: "#088F8F", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 20 },
//   buttonText: { color: "white", fontWeight: "bold" },
// });

// export default OrderScreen;
// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, StyleSheet, Pressable, Linking, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { auth, db } from "../firebase";
// import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
// import { Ionicons } from "@expo/vector-icons";
// import MapView, { Marker } from "react-native-maps";

// const OrderScreen = () => {
//   const navigation = useNavigation();
//   const [orders, setOrders] = useState([]);
//   const [vendorDetails, setVendorDetails] = useState({});

//   useEffect(() => {
//     if (!auth.currentUser) return;

//     const q = query(
//       collection(db, "orders"),
//       where("userId", "==", auth.currentUser.uid),
//       orderBy("createdAt", "desc")
//     );

//     const unsubscribe = onSnapshot(q, async (snapshot) => {
//       const fetchedOrders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setOrders(fetchedOrders);

//       // Fetch vendor details for each order
//       const vendorDetailsMap = {};
//       for (const order of fetchedOrders) {
//         if (order.vendorId && !vendorDetailsMap[order.vendorId]) {
//           try {
//             const vendorDoc = await getDoc(doc(db, "vendors", order.vendorId));
//             if (vendorDoc.exists()) {
//               vendorDetailsMap[order.vendorId] = vendorDoc.data();
//             }
//           } catch (error) {
//             console.error("Error fetching vendor details:", error);
//           }
//         }
//       }
//       setVendorDetails(vendorDetailsMap);
//     });

//     return () => unsubscribe();
//   }, []);

//   // Phone number open in dialer
//   const handleCall = (phone) => {
//     if (phone) {
//       Linking.openURL(`tel:${phone}`);
//     }
//   };

//   // Open address in Google Maps
//   const handleOpenMap = (address, location) => {
//     if (location?.lat && location?.lng) {
//       const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
//       Linking.openURL(url);
//     } else if (address) {
//       const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
//       Linking.openURL(url);
//     }
//   };

//   const renderVendorInfo = (order) => {
//     const vendor = vendorDetails[order.vendorId];
    
//     // Fallback vendor info from order data or default
//     const vendorInfo = {
//       name: vendor?.name || vendor?.businessName || order.vendorName || "Laundry Service",
//       phone: vendor?.phone || vendor?.phoneNumber || order.vendorPhone || "Not available",
//       address: vendor?.address || order.vendorAddress || "Address not available",
//       location: vendor?.location || order.vendorLocation || null
//     };

//     return (
//       <View style={styles.vendorSection}>
//         <Text style={styles.vendorTitle}>🏪 Vendor Information</Text>
        
//         <View style={styles.vendorInfo}>
//           <View style={styles.infoRow}>
//             <Ionicons name="business" size={18} color="#318CE7" />
//             <Text style={styles.vendorText}>{vendorInfo.name}</Text>
//           </View>
          
//           <TouchableOpacity 
//             style={styles.infoRow}
//             onPress={() => handleCall(vendorInfo.phone)}
//             disabled={vendorInfo.phone === "Not available"}
//           >
//             <Ionicons name="call" size={18} color={vendorInfo.phone !== "Not available" ? "#318CE7" : "#999"} />
//             <Text style={[
//               styles.vendorText, 
//               { color: vendorInfo.phone !== "Not available" ? "#318CE7" : "#999" }
//             ]}>
//               {vendorInfo.phone}
//             </Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={styles.infoRow}
//             onPress={() => handleOpenMap(vendorInfo.address, vendorInfo.location)}
//             disabled={vendorInfo.address === "Address not available"}
//           >
//             <Ionicons name="location" size={18} color={vendorInfo.address !== "Address not available" ? "#318CE7" : "#999"} />
//             <Text style={[
//               styles.vendorText, 
//               { color: vendorInfo.address !== "Address not available" ? "#318CE7" : "#999", flex: 1 }
//             ]}>
//               📍 {vendorInfo.address}
//             </Text>
//           </TouchableOpacity>

//           {/* Mini map if location is available */}
//           {vendorInfo.location?.lat && vendorInfo.location?.lng && (
//             <View style={styles.mapContainer}>
//               <MapView
//                 style={styles.miniMap}
//                 initialRegion={{
//                   latitude: vendorInfo.location.lat,
//                   longitude: vendorInfo.location.lng,
//                   latitudeDelta: 0.01,
//                   longitudeDelta: 0.01,
//                 }}
//                 scrollEnabled={false}
//                 zoomEnabled={false}
//               >
//                 <Marker
//                   coordinate={{
//                     latitude: vendorInfo.location.lat,
//                     longitude: vendorInfo.location.lng,
//                   }}
//                   title="Vendor Location"
//                 />
//               </MapView>
//               <TouchableOpacity 
//                 style={styles.mapButton}
//                 onPress={() => handleOpenMap(vendorInfo.address, vendorInfo.location)}
//               >
//                 <Text style={styles.mapButtonText}>Open in Maps</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       </View>
//     );
//   };

//   return (
//     <ScrollView style={{ padding: 16 }}>
//       <Text style={styles.heading}>Your Orders</Text>
//       {orders.length === 0 ? (
//         <View style={styles.emptyState}>
//           <Text style={styles.emptyText}>No orders found</Text>
//         </View>
//       ) : (
//         orders.map((order) => (
//           <View key={order.id} style={styles.orderCard}>
//             {/* Order Header */}
//             <View style={styles.orderHeader}>
//               <Text style={styles.orderId}>Order #{order.id.slice(0, 8)}</Text>
//               <Text style={[styles.status, styles[order.status?.toLowerCase() || 'pending']]}>
//                 {order.status || "Pending"}
//               </Text>
//             </View>

//             {/* Order Items */}
//             <View style={styles.itemsSection}>
//               <Text style={styles.sectionTitle}>📋 Items:</Text>
//               {order.cart?.map((item, index) => (
//                 <Text key={index} style={styles.itemText}>
//                   • {item.name} x{item.quantity} - Rs{item.price * item.quantity}
//                 </Text>
//               ))}
//             </View>

//             {/* Vendor Information */}
//             {renderVendorInfo(order)}

//             {/* Order Details */}
//             <View style={styles.detailsSection}>
//               <Text style={styles.sectionTitle}>📝 Order Details:</Text>
//               <Text style={styles.detailText}>📅 Pickup: {order.pickUpDate}</Text>
//               <Text style={styles.detailText}>⏰ Time: {order.selectedTime}</Text>
//               {order.delivery && (
//                 <Text style={styles.detailText}>🚚 Delivery: {order.delivery}</Text>
//               )}
//               {order.pickUpLocation && (
//                 <Text style={styles.detailText}>📍 Location: {order.pickUpLocation}</Text>
//               )}
//             </View>

//             {/* Order Total */}
//             <View style={styles.totalSection}>
//               <Text style={styles.total}>Total: Rs{order.total}</Text>
//             </View>
//           </View>
//         ))
//       )}
      
//       <Pressable style={styles.button} onPress={() => navigation.navigate("Home")}>
//         <Text style={styles.buttonText}>Back to Home</Text>
//       </Pressable>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   heading: { 
//     fontSize: 24, 
//     fontWeight: "bold", 
//     marginBottom: 20,
//     textAlign: "center",
//     color: "#333"
//   },
//   emptyState: {
//     alignItems: "center",
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#666",
//   },
//   orderCard: { 
//     backgroundColor: "#fff", 
//     padding: 16, 
//     borderRadius: 12, 
//     marginBottom: 16,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   orderHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//     paddingBottom: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//   },
//   orderId: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   status: {
//     fontSize: 14,
//     fontWeight: "600",
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 12,
//     textAlign: "center",
//   },
//   pending: { backgroundColor: "#FFF3CD", color: "#856404" },
//   completed: { backgroundColor: "#D4EDDA", color: "#155724" },
//   rejected: { backgroundColor: "#F8D7DA", color: "#721C24" },
//   accepted: { backgroundColor: "#D1ECF1", color: "#0C5460" },
  
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 8,
//   },
//   itemsSection: {
//     marginBottom: 12,
//   },
//   itemText: {
//     fontSize: 14,
//     color: "#555",
//     marginLeft: 8,
//   },
  
//   // Vendor Section Styles
//   vendorSection: {
//     backgroundColor: "#f8f9fa",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   vendorTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//     marginBottom: 8,
//   },
//   vendorInfo: {
//     gap: 8,
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   vendorText: {
//     fontSize: 14,
//     color: "#555",
//   },
//   mapContainer: {
//     marginTop: 8,
//   },
//   miniMap: {
//     height: 100,
//     borderRadius: 6,
//   },
//   mapButton: {
//     backgroundColor: "#318CE7",
//     padding: 6,
//     borderRadius: 4,
//     alignItems: "center",
//     marginTop: 4,
//   },
//   mapButtonText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "500",
//   },
  
//   detailsSection: {
//     marginBottom: 12,
//   },
//   detailText: {
//     fontSize: 14,
//     color: "#555",
//     marginLeft: 8,
//   },
//   totalSection: {
//     alignItems: "flex-end",
//     paddingTop: 8,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   total: { 
//     fontSize: 18, 
//     fontWeight: "bold",
//     color: "#088F8F"
//   },
//   button: { 
//     backgroundColor: "#088F8F", 
//     padding: 15, 
//     borderRadius: 8, 
//     alignItems: "center", 
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   buttonText: { 
//     color: "white", 
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// export default OrderScreen;
import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Pressable, 
  Linking, 
  TouchableOpacity,
  RefreshControl,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";

const OrderScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) {
      Alert.alert("Login Required", "Please log in to view your orders");
      navigation.navigate("Login");
      return;
    }

    // Set up real-time listener for user's orders
    const q = query(
      collection(db, "orders"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log("Real-time orders update:", snapshot.size, "orders");
        
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        setOrders([...fetchedOrders]);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        Alert.alert("Error", "Failed to load orders");
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCall = (phone) => {
    if (phone && phone.trim()) {
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      Linking.openURL(`tel:${cleanPhone}`)
        .catch(() => Alert.alert("Error", "Cannot make phone call"));
    } else {
      Alert.alert("No Phone", "Vendor phone number not available");
    }
  };

  const handleOpenMap = (address, location) => {
    if (location?.lat && location?.lng) {
      const url = `https://www.google.com/maps?q=${location.lat},${location.lng}`;
      Linking.openURL(url).catch(() => Alert.alert("Error", "Cannot open maps"));
    } else if (address && address.trim()) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      Linking.openURL(url).catch(() => Alert.alert("Error", "Cannot open maps"));
    } else {
      Alert.alert("No Location", "Location not available");
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '#ff9800';
      case 'accepted': return '#2196F3';
      case 'completed': return '#4CAF50';
      case 'rejected': return '#f44336';
      default: return '#666';
    }
  };

  const renderVendorInfo = (order) => {
    // Placeholder vendor info - in real app, this would come from vendor collection
    const vendorInfo = {
      name: order.vendorName || "Clean & Fresh Laundry",
      phone: order.vendorPhone || "+92 300 1234567",
      address: order.vendorAddress || "Main Market, Gulberg III, Lahore",
      location: order.vendorLocation || { lat: 31.5204, lng: 74.3587 }
    };

    return (
      <View style={styles.vendorSection}>
        <Text style={styles.vendorTitle}>Laundry Service Provider</Text>
        
        <View style={styles.vendorInfo}>
          <View style={styles.infoRow}>
            <Ionicons name="business" size={18} color="#318CE7" />
            <Text style={styles.vendorText}>{vendorInfo.name}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleCall(vendorInfo.phone)}
          >
            <Ionicons name="call" size={18} color="#318CE7" />
            <Text style={[styles.vendorText, { color: "#318CE7" }]}>
              {vendorInfo.phone}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.infoRow}
            onPress={() => handleOpenMap(vendorInfo.address, vendorInfo.location)}
          >
            <Ionicons name="location" size={18} color="#318CE7" />
            <Text style={[styles.vendorText, { color: "#318CE7", flex: 1 }]} numberOfLines={2}>
              {vendorInfo.address}
            </Text>
          </TouchableOpacity>

          {/* Mini map */}
          {vendorInfo.location?.lat && vendorInfo.location?.lng && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.miniMap}
                initialRegion={{
                  latitude: vendorInfo.location.lat,
                  longitude: vendorInfo.location.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: vendorInfo.location.lat,
                    longitude: vendorInfo.location.lng,
                  }}
                  title="Vendor Location"
                />
              </MapView>
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={() => handleOpenMap(vendorInfo.address, vendorInfo.location)}
              >
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.heading}>Your Orders</Text>
        <Text style={styles.subHeading}>Track your laundry orders</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>Your orders will appear here once you place them</Text>
          <Pressable style={styles.shopButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </Pressable>
        </View>
      ) : (
        orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            {/* Order Header */}
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>Order #{order.id.slice(0, 8)}</Text>
                <Text style={styles.orderDate}>
                  {order.createdAt?.toDate?.()?.toLocaleDateString() || "Date not available"}
                </Text>
              </View>
              <View style={styles.statusContainer}>
                <Text style={[styles.status, { color: getStatusColor(order.status) }]}>
                  {order.status || "Pending"}
                </Text>
              </View>
            </View>

            {/* Order Items */}
            <View style={styles.itemsSection}>
              <Text style={styles.sectionTitle}>Items</Text>
              {order.cart?.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDetails}>
                    {item.quantity} × Rs{item.price} = Rs{item.quantity * item.price}
                  </Text>
                </View>
              ))}
            </View>

            {/* Vendor Information */}
            {renderVendorInfo(order)}

            {/* Pickup Details */}
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Pickup Details</Text>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.detailText}>Date: {order.pickUpDate}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.detailText}>Time: {order.selectedTime}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="car" size={16} color="#666" />
                <Text style={styles.detailText}>Delivery: {order.delivery}</Text>
              </View>
              {order.pickUpLocation && (
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#666" />
                  <Text style={styles.detailText} numberOfLines={2}>
                    Address: {order.pickUpLocation}
                  </Text>
                </View>
              )}
            </View>

            {/* Order Total */}
            <View style={styles.totalSection}>
              <Text style={styles.total}>Total: Rs{order.total || 0}</Text>
            </View>
          </View>
        ))
      )}
      
      <Pressable style={styles.backButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },
  heading: { 
    fontSize: 24, 
    fontWeight: "bold",
    color: "#333"
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  
  emptyState: {
    alignItems: "center",
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: "#088F8F",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  
  orderCard: { 
    backgroundColor: "#fff", 
    margin: 15,
    borderRadius: 12, 
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: "hidden",
  },
  
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: "#f8f9fa",
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  
  itemsSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  itemDetails: {
    fontSize: 12,
    color: "#666",
  },
  
  // Vendor Section Styles
  vendorSection: {
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  vendorTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  vendorInfo: {
    gap: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  vendorText: {
    fontSize: 14,
    color: "#555",
  },
  mapContainer: {
    marginTop: 10,
    borderRadius: 6,
    overflow: "hidden",
  },
  miniMap: {
    height: 80,
  },
  mapButton: {
    backgroundColor: "#318CE7",
    padding: 6,
    alignItems: "center",
  },
  mapButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  
  detailsSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  
  totalSection: {
    padding: 15,
    alignItems: "flex-end",
  },
  total: { 
    fontSize: 18, 
    fontWeight: "bold",
    color: "#088F8F"
  },
  
  backButton: { 
    backgroundColor: "#6c757d", 
    margin: 15,
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center",
    marginBottom: 30,
  },
  backButtonText: { 
    color: "white", 
    fontWeight: "600",
    fontSize: 16,
  },
});

export default OrderScreen;