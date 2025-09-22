// import React from "react";
// import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { auth, db } from "../firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const CartScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { cart = [], selectedTime, no_Of_days, pickUpDate, pickUpLocation, setCart } = route.params || {};

//   const total = cart.reduce(
//     (sum, item) =>
//       sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
//     0
//   );

//   const placeOrder = async () => {
//     try {
//       if (!auth.currentUser) {
//         alert("Please log in to place an order.");
//         return;
//       }

//       if (!cart.length) {
//         alert("Your cart is empty.");
//         return;
//       }

//       const cleanedCart = cart.map(item => ({
//         name: item?.name || "",
//         quantity: Number(item?.quantity) || 0,
//         price: Number(item?.price) || 0,
//       }));

//       await addDoc(collection(db, "orders"), {
//         userId: auth.currentUser.uid,
//         service: cleanedCart.map(i => i.name).join(", "),
//         price: total,
//         cart: cleanedCart,
//         selectedTime: selectedTime || "",
//         no_Of_days: Number(no_Of_days) || 0,
//         pickUpDate: pickUpDate || "",
//         pickUpLocation: pickUpLocation || "", // ✅ Map / Address save
//         total: Number(total) || 0,
//         status: "Pending",
//         createdAt: serverTimestamp(),
//       });

//       alert("Order placed successfully!");

//       // ✅ Clear cart
//       if (setCart) {
//         setCart([]);
//       }
//       route.params.cart = [];

//       // ✅ Redirect home
//       navigation.reset({
//         index: 0,
//         routes: [{ name: "Home", params: { cart: [] } }],
//       });

//     } catch (error) {
//       console.error("Error placing order: ", error);
//       alert("Failed to place order. Please try again.");
//     }
//   };

//   return (
//     <ScrollView style={{ padding: 16 }}>
//       <Text style={styles.heading}>Cart</Text>
//       {cart.length === 0 ? (
//         <Text>No items in the cart</Text>
//       ) : (
//         <>
//           {cart.map((item, index) => (
//             <View key={index} style={styles.itemContainer}>
//               <Text>
//                 {item?.name} x{item?.quantity} - Rs
//                 {(Number(item?.price) || 0) * (Number(item?.quantity) || 0)}
//               </Text>
//             </View>
//           ))}
//           <Text style={styles.total}>Total: Rs{total}</Text>
//           <Pressable style={styles.button} onPress={placeOrder}>
//             <Text style={styles.buttonText}>Place Order</Text>
//           </Pressable>
//         </>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
//   itemContainer: {
//     backgroundColor: "#eee",
//     padding: 10,
//     marginVertical: 5,
//     borderRadius: 8,
//   },
//   total: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
//   button: {
//     backgroundColor: "#088F8F",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: { color: "white", fontWeight: "bold" },
// });

// export default CartScreen;


// CartScreen.js
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, Alert, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    cart = [],
    customerName,
    phone,
    selectedDate,
    selectedTime,
    delivery,
    address,
    location,
    setCart,
  } = route.params || {};

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  const placeOrder = async () => {
    if (loading) return;
    
    try {
      setLoading(true);

      if (!auth.currentUser) {
        Alert.alert("Login Required", "Please log in to place an order.");
        return;
      }

      if (!cart.length) {
        Alert.alert("Cart Empty", "Please add items to your cart first.");
        return;
      }

      // Validate required fields
      if (!customerName?.trim() || !phone?.trim() || !address?.trim()) {
        Alert.alert("Missing Information", "Please fill in all customer details.");
        return;
      }

      const cleanedCart = cart.map((item) => ({
        name: item?.name || "Unknown Item",
        quantity: Number(item?.quantity) || 1,
        price: Number(item?.price) || 0,
      }));

      // FIXED: Ensure all customer data is properly stored
      const orderData = {
        // User identification
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        
        // Customer information - THIS IS THE FIX
        customerName: customerName.trim(),
        phone: phone.trim(),
        
        // Location data - FIXED FORMAT
        pickUpLocation: address.trim(),
        location: location && location.latitude && location.longitude ? {
          lat: parseFloat(location.latitude),
          lng: parseFloat(location.longitude)
        } : null,
        
        // Order details
        cart: cleanedCart,
        service: cleanedCart.map((item) => item.name).join(", "),
        pickUpDate: selectedDate || new Date().toDateString(),
        selectedTime: selectedTime || "",
        delivery: delivery || "",
        total: Number(total) || 0,
        
        // Status and timestamps
        status: "Pending",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        
        // Additional metadata for vendor dashboard
        orderNumber: `ORD-${Date.now()}`,
        customerInfo: {
          name: customerName.trim(),
          phoneNumber: phone.trim(),
          address: address.trim(),
          coordinates: location && location.latitude && location.longitude ? {
            latitude: parseFloat(location.latitude),
            longitude: parseFloat(location.longitude)
          } : null
        }
      };

      console.log("📝 Order data being saved:", orderData);
      
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("✅ Order placed successfully with ID:", docRef.id);

      Alert.alert(
        "Order Placed Successfully!", 
        `Order ID: ${docRef.id.slice(0, 8)}\nCustomer: ${customerName}\nPhone: ${phone}\nTotal: Rs${total}`,
        [
          {
            text: "OK",
            onPress: () => {
              if (setCart) setCart([]);
              navigation.reset({ index: 0, routes: [{ name: "Home" }] });
            }
          }
        ]
      );

    } catch (error) {
      console.error("❌ Error placing order:", error);
      Alert.alert(
        "Order Failed", 
        `Error: ${error.message}\nPlease check your connection and try again.`,
        [{ text: "Try Again", style: "default" }]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Order Summary</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Pressable 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Cart Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items</Text>
            {cart.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item?.name || "Unknown Item"}</Text>
                  <Text style={styles.itemMeta}>
                    Qty: {item?.quantity || 1} × Rs{item?.price || 0}
                  </Text>
                </View>
                <Text style={styles.itemTotal}>
                  Rs{(Number(item?.price) || 0) * (Number(item?.quantity) || 0)}
                </Text>
              </View>
            ))}
          </View>

          {/* Customer Information - SHOWING WHAT WILL BE SAVED */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Customer Details (Will be visible to vendor)</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Ionicons name="person" size={20} color="#666" />
                <Text style={styles.infoLabel}>Name:</Text>
                <Text style={styles.infoValue}>{customerName || "Not provided"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="call" size={20} color="#666" />
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{phone || "Not provided"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={20} color="#666" />
                <Text style={styles.infoLabel}>Address:</Text>
                <Text style={styles.infoValue} numberOfLines={2}>{address || "Not provided"}</Text>
              </View>
              {location?.latitude && location?.longitude && (
                <View style={styles.infoRow}>
                  <Ionicons name="map" size={20} color="#666" />
                  <Text style={styles.infoLabel}>GPS:</Text>
                  <Text style={styles.infoValue}>
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Order Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup Details</Text>
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Ionicons name="calendar" size={20} color="#666" />
                <Text style={styles.infoLabel}>Date:</Text>
                <Text style={styles.infoValue}>
                  {selectedDate || new Date().toDateString()}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="time" size={20} color="#666" />
                <Text style={styles.infoLabel}>Time:</Text>
                <Text style={styles.infoValue}>{selectedTime || "Not selected"}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="car" size={20} color="#666" />
                <Text style={styles.infoLabel}>Delivery:</Text>
                <Text style={styles.infoValue}>{delivery || "Not selected"}</Text>
              </View>
            </View>
          </View>

          {/* Total and Place Order */}
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>Rs {total}</Text>
            </View>
            
            <Pressable 
              style={[styles.placeOrderButton, loading && styles.disabledButton]} 
              onPress={placeOrder}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="white" size="small" />
                  <Text style={styles.loadingText}>Placing Order...</Text>
                </View>
              ) : (
                <Text style={styles.placeOrderText}>Place Order</Text>
              )}
            </Pressable>

            <Pressable 
              style={styles.backButton} 
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.backButtonText}>Go Back</Text>
            </Pressable>
          </View>
        </>
      )}
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
    color: "#333",
  },
  
  section: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemMeta: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: "#088F8F",
  },
  
  infoContainer: {
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    minWidth: 60,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  
  totalSection: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 10,
    elevation: 2,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#088F8F",
  },
  
  placeOrderButton: {
    backgroundColor: "#088F8F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  placeOrderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loadingText: {
    color: "white",
    fontSize: 16,
  },
  
  backButton: {
    backgroundColor: "#6c757d",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  
  emptyCart: {
    alignItems: "center",
    marginTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 20,
    marginBottom: 30,
  },
});

export default CartScreen;
