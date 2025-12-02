import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { db } from "../firebase";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

export default function VendorDashboardScreen() {
  const [orders, setOrders] = useState([]);

  // ✅ Real-time fetch orders
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "orders"), (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
    });
    return () => unsub();
  }, []);

  // ✅ Update status (Accept, Reject, Complete)
  const handleStatusChange = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
  };

  // ✅ Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  // ✅ Open map link
  const openMap = (location) => {
    if (location) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Vendor Dashboard</Text>

      {/* ✅ Analytics cards */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{orders.length}</Text>
          <Text style={styles.cardLabel}>Total Orders</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>Rs {totalRevenue}</Text>
          <Text style={styles.cardLabel}>Revenue</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{pendingOrders}</Text>
          <Text style={styles.cardLabel}>Pending</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardValue}>{completedOrders}</Text>
          <Text style={styles.cardLabel}>Completed</Text>
        </View>
      </View>

      {/* ✅ Orders list */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderTitle}>🆔 #{item.id.slice(0, 6)} - Rs {item.total}</Text>
            <Text>👤 {item.name}</Text>
            <Text>📞 {item.phone}</Text>

            {/* ✅ Map link */}
            <TouchableOpacity onPress={() => openMap(item.location)}>
              <Text style={styles.mapLink}>📍 View on Map</Text>
            </TouchableOpacity>

            {/* ✅ Items */}
            <Text style={styles.sectionTitle}>🧺 Items:</Text>
            {item.items?.map((i, idx) => (
              <Text key={idx}>- {i.name} x{i.qty} = Rs {i.price * i.qty}</Text>
            ))}

            {/* ✅ Other details */}
            <Text>💳 Payment: {item.paymentMethod}</Text>
            <Text>📦 Pickup: {item.pickup}</Text>
            <Text>📅 Date: {item.date}</Text>
            <Text>Status: {item.status}</Text>

            {/* ✅ Action buttons */}
            <View style={styles.actionRow}>
              {item.status === "pending" && (
                <>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#4CAF50" }]}
                    onPress={() => handleStatusChange(item.id, "accepted")}
                  >
                    <Text style={styles.btnText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#F44336" }]}
                    onPress={() => handleStatusChange(item.id, "rejected")}
                  >
                    <Text style={styles.btnText}>Reject</Text>
                  </TouchableOpacity>
                </>
              )}

              {item.status === "accepted" && (
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: "#2196F3" }]}
                  onPress={() => handleStatusChange(item.id, "completed")}
                >
                  <Text style={styles.btnText}>Mark Complete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f9f9f9" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  cardContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardValue: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardLabel: { fontSize: 14, color: "#777" },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  orderTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  sectionTitle: { fontWeight: "bold", marginTop: 5 },
  mapLink: { color: "#2196F3", textDecorationLine: "underline", marginVertical: 5 },
  actionRow: { flexDirection: "row", marginTop: 10, justifyContent: "space-around" },
  btn: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
