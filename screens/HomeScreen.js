// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   StyleSheet,
//   View,
//   Alert,
//   Pressable,
//   Image,
//   TextInput,
//   ScrollView,
// } from "react-native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { Feather } from "@expo/vector-icons";
// import * as Location from "expo-location";
// import Carousel from "../components/Carousel";
// import Services from "../components/Services";
// import DressItem from "../components/Dressitem";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const HomeScreen = () => {
//   const cart = useSelector((state) => state.cart.cart);
//   const product = useSelector((state) => state.product.product);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   const [items, setItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
//     "We are loading your location"
//   );
//   const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

//   const services = [
//     {
//       id: "0",
//       image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
//       name: "shirt",
//       quantity: 0,
//       price: 350,
//     },
//     {
//       id: "11",
//       image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
//       name: "T-shirt",
//       quantity: 0,
//       price: 200,
//     },
//     {
//       id: "12",
//       image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
//       name: "dresses",
//       quantity: 45,
//       price: 150,
//     },
//     {
//       id: "13",
//       image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
//       name: "jeans",
//       quantity: 0,
//       price: 170,
//     },
//     {
//       id: "14",
//       image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
//       name: "Sweater",
//       quantity: 0,
//       price: 100,
//     },
//     {
//       id: "15",
//       image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
//       name: "shorts",
//       quantity: 0,
//       price: 460,
//     },
//     {
//       id: "16",
//       image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
//       name: "Sleeveless",
//       quantity: 0,
//       price: 130,
//     },
//   ];

//   useEffect(() => {
//     checkIfLocationEnabled();
//     getCurrentLocation();
//     setFilteredServices(services); // Set initial data
//   }, []);

//   useEffect(() => {
//     if (product.length > 0) return;
//     const fetchProducts = async () => {
//       const colRef = collection(db, "types");
//       const docsSnap = await getDocs(colRef);
//       docsSnap.forEach((doc) => {
//         items.push(doc.data());
//       });
//       items?.map((service) => dispatch(getProducts(service)));
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const filtered = services.filter((item) =>
//       item.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredServices(filtered);
//   }, [searchQuery]);

//   const checkIfLocationEnabled = async () => {
//     let enabled = await Location.hasServicesEnabledAsync();
//     if (!enabled) {
//       Alert.alert(
//         "Location services not enabled",
//         "Please enable the location services",
//         [
//           { text: "Cancel", style: "cancel" },
//           { text: "OK" },
//         ],
//         { cancelable: false }
//       );
//     } else {
//       setLocationServicesEnabled(enabled);
//     }
//   };

//   const getCurrentLocation = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission denied",
//         "Allow the app to use the location services",
//         [{ text: "Cancel", style: "cancel" }, { text: "OK" }],
//         { cancelable: false }
//       );
//     }
//     const { coords } = await Location.getCurrentPositionAsync();
//     if (coords) {
//       const { latitude, longitude } = coords;
//       let response = await Location.reverseGeocodeAsync({ latitude, longitude });
//       for (let item of response) {
//         let address = `${item.name} ${item.city} ${item.postalCode}`;
//         setDisplayCurrentAddress(address);
//       }
//     }
//   };

//   const total = cart
//     .map((item) => item.quantity * item.price)
//     .reduce((curr, prev) => curr + prev, 0);

//   return (
//     <>
//       <ScrollView style={{ backgroundColor: "#F0F0F0", height: "100%" }}>
//         <View style={{ flexDirection: "row", alignItems: "center", padding: 10, marginTop: 20 }}>
//           <MaterialIcons style={{ paddingTop: 30, paddingLeft: 10 }} name="my-location" size={24} color="red" />
//           <View>
//             <Text style={{ fontSize: 20, fontWeight: '700', paddingLeft: 10 }}>Home</Text>
//             <Text style={{ paddingLeft: 10 }}>{displayCurrentAddress}</Text>
//           </View>
//           <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 10 }}>
//             <Image
//               style={{ width: 40, height: 40, borderRadius: 20 }}
//               source={{
//                 uri: "https://lh3.googleusercontent.com/ogw/AF2bZyhWn7qd_TQ-5UE-mQ3mtTUvNhFFGXgse5MGlhD4cXCZoQ=s32-c-mo",
//               }}
//             />
//           </Pressable>
//         </View>

//         {/* Search Bar */}
//         <View
//           style={{
//             padding: 10,
//             margin: 10,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             borderWidth: 0.8,
//             borderColor: "#C0C0C0",
//             borderRadius: 7,
//           }}
//         >
//           <TextInput
//             placeholder="Search for items or More"
//             value={searchQuery}
//             onChangeText={(text) => setSearchQuery(text)}
//             style={{ flex: 1 }}
//           />
//           <Feather name="search" size={24} color="#fd5c63" />
//         </View>

//         <View style={{ marginTop: 8, padding: 8, paddingRight: 20 }}>
//           <Carousel />
//         </View>

//         <Services />

//         {filteredServices.map((item, index) => (
//           <DressItem item={item} key={index} />
//         ))}
//       </ScrollView>

//       {total === 0 ? null : (
//         <Pressable
//           style={{
//             backgroundColor: "#088F8F",
//             padding: 10,
//             marginBottom: 40,
//             margin: 15,
//             borderRadius: 7,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <View>
//             <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
//               {cart.length} items | Rs {total}
//             </Text>
//             <Text style={{ fontSize: 15, fontWeight: "400", color: "white", marginVertical: 6 }}>
//               extra charges might apply
//             </Text>
//           </View>
//           <Pressable onPress={() => navigation.navigate("PickUp")}>
//             <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
//               Proceed to pickup
//             </Text>
//           </Pressable>
//         </Pressable>
//       )}
//     </>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});
import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/Dressitem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "We are loading your location"
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  const [orders, setOrders] = useState([]); // ✅ Real-time orders state

  const services = [
    { id: "0", image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png", name: "shirt", quantity: 0, price: 350 },
    { id: "11", image: "https://cdn-icons-png.flaticon.com/128/892/892458.png", name: "T-shirt", quantity: 0, price: 200 },
    { id: "12", image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png", name: "dresses", quantity: 45, price: 150 },
    { id: "13", image: "https://cdn-icons-png.flaticon.com/128/599/599388.png", name: "jeans", quantity: 0, price: 170 },
    { id: "14", image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png", name: "Sweater", quantity: 0, price: 100 },
    { id: "15", image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png", name: "shorts", quantity: 0, price: 460 },
    { id: "16", image: "https://cdn-icons-png.flaticon.com/128/293/293241.png", name: "Sleeveless", quantity: 0, price: 130 },
  ];

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
    setFilteredServices(services);

    // ✅ Real-time Firestore listener for order status
    if (auth.currentUser) {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
      });
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (product.length > 0) return;
    const fetchProducts = async () => {
      const colRef = collection(db, "types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = services.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchQuery]);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert("Location services not enabled", "Please enable the location services");
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Allow the app to use the location services");
    }
    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({ latitude, longitude });
      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#F0F0F0", height: "100%" }}>

        {/* ✅ Status Card */}
        {orders.length > 0 && (
          <View style={styles.statusCard}>
            <Text style={styles.statusTitle}>Order Status</Text>
            {orders.map((order) => (
              <View key={order.id} style={styles.statusRow}>
                <Text style={styles.statusLabel}>Order:</Text>
                <Text style={styles.statusValue}>{order.status}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ flexDirection: "row", alignItems: "center", padding: 10, marginTop: 20 }}>
          <MaterialIcons style={{ paddingTop: 30, paddingLeft: 10 }} name="my-location" size={24} color="red" />
          <View>
            <Text style={{ fontSize: 20, fontWeight: '700', paddingLeft: 10 }}>Home</Text>
            <Text style={{ paddingLeft: 10 }}>{displayCurrentAddress}</Text>
          </View>
          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 10 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://lh3.googleusercontent.com/ogw/AF2bZyhWn7qd_TQ-5UE-mQ3mtTUvNhFFGXgse5MGlhD4cXCZoQ=s32-c-mo",
              }}
            />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={{
          padding: 10, margin: 10, flexDirection: "row", alignItems: "center",
          justifyContent: "space-between", borderWidth: 0.8, borderColor: "#C0C0C0", borderRadius: 7
        }}>
          <TextInput
            placeholder="Search for items or More"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            style={{ flex: 1 }}
          />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        <View style={{ marginTop: 8, padding: 8, paddingRight: 20 }}>
          <Carousel />
        </View>

        <Services />

        {filteredServices.map((item, index) => (
          <DressItem item={item} key={index} />
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={{
          backgroundColor: "#088F8F", padding: 10, marginBottom: 40, margin: 15,
          borderRadius: 7, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        }}>
          <View>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              {cart.length} items | Rs {total}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "white", marginVertical: 6 }}>
              extra charges might apply
            </Text>
          </View>
          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  statusCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    margin: 10,
    elevation: 2
  },
  statusTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  statusRow: { flexDirection: "row", marginVertical: 5 },
  statusLabel: { fontWeight: "bold", marginRight: 5 },
  statusValue: { color: "#088F8F", fontWeight: "600" },
});
