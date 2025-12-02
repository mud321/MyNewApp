import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { auth, db } from "../firebase";
import { collection, addDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import HomeScreen from "./HomeScreen";

export default function CartScreen({ navigation, route }) {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState(null);
  const [pickup, setPickup] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // ✅ Receive params from PickUpScreen
  const {
    cart: cartFromPickup = [],
    customerName,
    phone,
    selectedDate,
    selectedTime,
    delivery,
    address,
    location,
  } = route.params || {};

  // ✅ Fetch user data (if not passed)
  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        }
      }
    };
    fetchUser();
  }, []);

  // ✅ Cart source: use params if available, else Firestore
  useEffect(() => {
    if (cartFromPickup.length > 0) {
      setCartItems(cartFromPickup);
    } else {
      const unsub = onSnapshot(
        collection(db, "carts", auth.currentUser.uid, "items"),
        (snapshot) => {
          const items = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCartItems(items);
        }
      );
      return () => unsub();
    }
  }, [cartFromPickup]);

  // ✅ Safe total calculation
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || item.qty || 0) * (item.price || 0),
    0
  );

  // ✅ Place Order
  const handlePlaceOrder = async () => {
    if (!customerName || !phone || !address) {
      Alert.alert("Error", "Customer details missing!");
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert("Error", "Your cart is empty!");
      return;
    }

    await addDoc(collection(db, "orders"), {
      userId: auth.currentUser.uid,
      name: customerName,
      phone,
      location: address,
      coords: location || null,
      items: cartItems,
      total: totalAmount,
      pickup: delivery,
      paymentMethod,
      date: `${selectedDate} ${selectedTime}`,
      status: "pending",
    });

    Alert.alert("✅ Success", "Your order has been placed!");
    navigation.navigate("Orders");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🛒 My Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id?.toString()}
        ListEmptyComponent={<Text style={styles.emptyCart}>Your cart is empty</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>Qty: {item.qty || item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>Rs {(item.qty || item.quantity) * item.price}</Text>
          </View>
        )}
      />

      <View style={styles.totalCard}>
        <Text style={styles.totalText}>Total Amount</Text>
        <Text style={styles.totalValue}>Rs {totalAmount}</Text>
      </View>

      {/* Pickup */}
      <TextInput
        placeholder="Pickup type (home/shop)"
        value={pickup}
        onChangeText={setPickup}
        style={styles.input}
      />

      {/* Payment Methods */}
      {["Cash on Delivery", "JazzCash", "Easypaisa"].map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.paymentBtn,
            paymentMethod === method && styles.paymentBtnActive,
          ]}
          onPress={() => setPaymentMethod(method)}
        >
          <Text
            style={[
              styles.paymentText,
              paymentMethod === method && { color: "#fff" },
            ]}
          >
            {method}
          </Text>
        </TouchableOpacity>
      ))}

      {/* Place Order */}
      <TouchableOpacity style={styles.orderBtn} onPress={handlePlaceOrder}>
        <Text style={styles.orderBtnText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  emptyCart: { textAlign: "center", marginTop: 20, color: "#888" },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemQty: { fontSize: 14, color: "#777" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#333" },
  totalCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 2,
  },
  totalText: { fontSize: 16, fontWeight: "600", color: "#444" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#000" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
  paymentBtn: {
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  paymentBtnActive: { backgroundColor: "#2196F3", borderColor: "#2196F3" },
  paymentText: { fontWeight: "600", color: "#333" },
  orderBtn: {
    marginTop: 15,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  orderBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

