import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc, collection, addDoc } from "firebase/firestore";

export default function OrderScreen() {
  const [order, setOrder] = useState("");
  const [pickup, setPickup] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
    };
    fetchUser();
  }, []);

  const handlePlaceOrder = async () => {
    if (!userData) {
      alert("User data not found!");
      return;
    }

    await addDoc(collection(db, "orders"), {
      userId: auth.currentUser.uid,
      name: userData.name,
      phone: userData.phone,
      location: userData.location,  // ✅ added location
      order,
      pickup,
      date: new Date().toLocaleDateString(),
      status: "pending",
    });

    alert("Order placed!");
    setOrder("");
    setPickup("");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Place Order</Text>
      <TextInput placeholder="Order details" value={order} onChangeText={setOrder} />
      <TextInput placeholder="Pickup type" value={pickup} onChangeText={setPickup} />
      <Button title="Submit Order" onPress={handlePlaceOrder} />
    </View>
  );
}
