// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
// import { auth, db } from "../firebase";
// import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// const VendorProfileScreen = () => {
//   const user = auth.currentUser;
//   const [vendor, setVendor] = useState({
//     name: "",
//     phone: "",
//     shopName: "",
//     address: "",
//     email: user?.email || "",
//   });

//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch vendor profile from Firestore
//   useEffect(() => {
//     if (!user) return;
//     const fetchVendor = async () => {
//       try {
//         const docRef = doc(db, "vendors", user.uid);
//         const snap = await getDoc(docRef);
//         if (snap.exists()) {
//           setVendor(snap.data());
//         }
//       } catch (error) {
//         console.error("Error fetching vendor profile:", error);
//       }
//     };
//     fetchVendor();
//   }, [user]);

//   // ✅ Save/Update profile
//   const saveProfile = async () => {
//     if (!user) {
//       Alert.alert("Error", "You must be logged in as a vendor.");
//       return;
//     }
//     setLoading(true);
//     try {
//       await setDoc(doc(db, "vendors", user.uid), {
//         ...vendor,
//         email: user.email,
//         updatedAt: serverTimestamp(),
//       });
//       Alert.alert("Success", "Profile updated successfully!");
//     } catch (error) {
//       console.error("Error saving vendor profile:", error);
//       Alert.alert("Error", "Could not save profile.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Vendor Profile</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={vendor.name}
//         onChangeText={(text) => setVendor({ ...vendor, name: text })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         value={vendor.phone}
//         onChangeText={(text) => setVendor({ ...vendor, phone: text })}
//         keyboardType="phone-pad"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Shop Name"
//         value={vendor.shopName}
//         onChangeText={(text) => setVendor({ ...vendor, shopName: text })}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Address"
//         value={vendor.address}
//         onChangeText={(text) => setVendor({ ...vendor, address: text })}
//       />

//       <Pressable style={styles.button} onPress={saveProfile} disabled={loading}>
//         <Text style={styles.buttonText}>
//           {loading ? "Saving..." : "Save Profile"}
//         </Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: "#fff" },
//   heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: "#088F8F",
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   buttonText: { color: "white", fontWeight: "bold" },
// });

// export default VendorProfileScreen;
