// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   TextInput,
//   Pressable,
//   ScrollView,
//   Alert,
// } from "react-native";
// import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";

// const PickUpScreen = () => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [delivery, setDelivery] = useState("");
//   const [location, setLocation] = useState(null);
//   const [address, setAddress] = useState("");

//   const cart = useSelector((state) => state.cart.cart);
//   const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

//   const deliveryTime = [
//     { id: "0", name: "2-3 Days" },
//     { id: "1", name: "3-4 Days" },
//     { id: "2", name: "4-5 Days" },
//     { id: "3", name: "5-6 Days" },
//     { id: "4", name: "Tomorrow" },
//   ];

//   const times = [
//     { id: "0", time: "11:00 AM" },
//     { id: "1", time: "12:00 PM" },
//     { id: "2", time: "1:00 PM" },
//     { id: "3", time: "2:00 PM" },
//     { id: "4", time: "3:00 PM" },
//     { id: "5", time: "4:00 PM" },
//   ];

//   const navigation = useNavigation();

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission denied", "Allow location access to continue");
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const coords = {
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//       };
//       setLocation(coords);
//       fetchAddress(coords);
//     })();
//   }, []);

//   const fetchAddress = async (coords) => {
//     try {
//       const geo = await Location.reverseGeocodeAsync(coords);
//       if (geo.length > 0) {
//         const addr = geo[0];
//         const fullAddress = `${addr.name || ""}, ${addr.street || ""}, ${addr.city || ""}, ${addr.region || ""}`;
//         setAddress(fullAddress);
//       }
//     } catch (error) {
//       console.log("Reverse geocoding error:", error);
//     }
//   };

//   const handleMapPress = (e) => {
//     const coords = e.nativeEvent.coordinate;
//     setLocation(coords);
//     fetchAddress(coords);
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
//         <Text style={styles.label}>Enter Address & What you Want</Text>
//         <TextInput
//           style={styles.inputBox}
//           placeholder="Enter full address and notes"
//           multiline
//           value={address}
//           onChangeText={(text) => setAddress(text)}
//         />

//         <Text style={styles.label}>Pick Up Date</Text>
//         <HorizontalDatepicker
//           mode="gregorian"
//           startDate={new Date("2025-08-15")}
//           endDate={new Date("2025-08-31")}
//           initialSelectedDate={new Date()}
//           onSelectedDateChange={(date) => setSelectedDate(date)}
//           selectedItemWidth={170}
//           unselectedItemWidth={38}
//           itemHeight={38}
//           itemRadius={10}
//           selectedItemTextStyle={styles.selectedItemTextStyle}
//           unselectedItemTextStyle={styles.selectedItemTextStyle}
//           selectedItemBackgroundColor="#222831"
//           unselectedItemBackgroundColor="#ececec"
//           flatListContainerStyle={styles.flatListContainerStyle}
//         />

//         <Text style={styles.label}>Select Time</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {times.map((item) => (
//             <Pressable
//               key={item.id}
//               onPress={() => setSelectedTime(item.time)}
//               style={[
//                 styles.optionButton,
//                 selectedTime === item.time && styles.selectedOption,
//               ]}
//             >
//               <Text>{item.time}</Text>
//             </Pressable>
//           ))}
//         </ScrollView>

//         <Text style={styles.label}>Delivery Time</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {deliveryTime.map((item) => (
//             <Pressable
//               key={item.id}
//               onPress={() => setDelivery(item.name)}
//               style={[
//                 styles.optionButton,
//                 delivery === item.name && styles.selectedOption,
//               ]}
//             >
//               <Text>{item.name}</Text>
//             </Pressable>
//           ))}
//         </ScrollView>

//         <Text style={styles.label}>Select Pickup Location</Text>
//         {location?.latitude && location?.longitude && (
//           <>
//             <MapView
//               style={styles.map}
//               initialRegion={{
//                 latitude: parseFloat(location.latitude),
//                 longitude: parseFloat(location.longitude),
//                 latitudeDelta: 0.01,
//                 longitudeDelta: 0.01,
//               }}
//               onPress={handleMapPress}
//             >
//               <Marker
//                 coordinate={{
//                   latitude: parseFloat(location.latitude),
//                   longitude: parseFloat(location.longitude),
//                 }}
//                 title="Pickup Location"
//               />
//             </MapView>

//             <Text style={{ margin: 10 }}>
//               📍 Lat: {location.latitude}, Lng: {location.longitude}
//             </Text>
//           </>
//         )}
//       </ScrollView>

//       {total > 0 && (
//         <Pressable style={styles.cartFooter}>
//           <View>
//             <Text style={styles.cartText}>
//               {cart.length} items | Rs {total}
//             </Text>
//             <Text style={styles.subText}>Extra charges might apply</Text>
//           </View>
//           <Pressable
//             onPress={() => {
//               if (!selectedDate || !selectedTime || !delivery || !address) {
//                 Alert.alert("Missing Info", "Please fill all the fields before proceeding.");
//                 return;
//               }

//               navigation.navigate("Cart", {
//                 cart,
//                 selectedDate: selectedDate.toDateString?.() || selectedDate,
//                 selectedTime,
//                 delivery,
//                 address,
//                 location,
//               });
//             }}
//           >
//             <Text style={styles.proceedText}>Proceed to Cart</Text>
//           </Pressable>
//         </Pressable>
//       )}
//     </SafeAreaView>
//   );
// };

// export default PickUpScreen;

// const styles = StyleSheet.create({
//   label: {
//     fontSize: 16,
//     fontWeight: "500",
//     marginHorizontal: 10,
//     marginTop: 10,
//   },
//   inputBox: {
//     padding: 40,
//     borderColor: "gray",
//     borderWidth: 0.8,
//     paddingVertical: 80,
//     borderRadius: 9,
//     margin: 10,
//     textAlignVertical: "top",
//   },
//   optionButton: {
//     margin: 10,
//     borderRadius: 7,
//     padding: 15,
//     borderColor: "gray",
//     borderWidth: 0.7,
//   },
//   selectedOption: {
//     borderColor: "blue",
//   },
//   map: {
//     height: 200,
//     margin: 10,
//     borderRadius: 10,
//   },
//   cartFooter: {
//     backgroundColor: "#088F8F",
//     padding: 10,
//     marginBottom: 20,
//     marginHorizontal: 15,
//     borderRadius: 7,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   cartText: {
//     fontSize: 17,
//     fontWeight: "600",
//     color: "white",
//   },
//   subText: {
//     fontSize: 15,
//     fontWeight: "400",
//     color: "white",
//     marginVertical: 6,
//   },
//   proceedText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "white",
//   },
// });
// ✅ Updated PickUpScreen.js (matches Firestore field names)
// PickUpScreen.js
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const PickUpScreen = () => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [delivery, setDelivery] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(true);

  const cart = useSelector((state) => state.cart.cart);
  const total = cart.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);

  const deliveryTime = [
    { id: "0", name: "2-3 Days" },
    { id: "1", name: "3-4 Days" },
    { id: "2", name: "4-5 Days" },
    { id: "3", name: "5-6 Days" },
    { id: "4", name: "Tomorrow" },
  ];

  const times = [
    { id: "0", time: "11:00 AM" },
    { id: "1", time: "12:00 PM" },
    { id: "2", time: "1:00 PM" },
    { id: "3", time: "2:00 PM" },
    { id: "4", time: "3:00 PM" },
    { id: "5", time: "4:00 PM" },
  ];

  const navigation = useNavigation();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required", 
          "Please allow location access to continue. You can set location manually on the map.",
          [{ text: "OK" }]
        );
        setLocationLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeout: 10000,
      });

      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      
      setLocation(coords);
      await fetchAddress(coords);
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Location Error", "Could not get your current location. Please select location on map.");
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchAddress = async (coords) => {
    try {
      const geoResult = await Location.reverseGeocodeAsync(coords);
      if (geoResult.length > 0) {
        const addr = geoResult[0];
        const fullAddress = [
          addr.name,
          addr.street,
          addr.district,
          addr.city,
          addr.region
        ].filter(Boolean).join(", ");
        
        setAddress(fullAddress || "Address not found");
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setAddress("Address not available");
    }
  };

  const handleMapPress = async (event) => {
    const coords = event.nativeEvent.coordinate;
    setLocation(coords);
    await fetchAddress(coords);
  };

  const validateForm = () => {
    const errors = [];
    
    if (!customerName.trim()) {
      errors.push("Customer name is required");
    }
    
    if (!phone.trim()) {
      errors.push("Phone number is required");
    } else if (phone.trim().length < 10) {
      errors.push("Phone number must be at least 10 digits");
    }
    
    if (!selectedDate) {
      errors.push("Please select a pickup date");
    }
    
    if (!selectedTime) {
      errors.push("Please select a pickup time");
    }
    
    if (!delivery) {
      errors.push("Please select delivery option");
    }
    
    if (!address.trim()) {
      errors.push("Address is required");
    }

    if (!cart || cart.length === 0) {
      errors.push("Your cart is empty");
    }

    return errors;
  };

  const handleProceedToCart = () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      Alert.alert("Please Complete All Fields", validationErrors.join("\n"));
      return;
    }

    setLoading(true);

    // Format date properly
    const formattedDate = selectedDate instanceof Date 
      ? selectedDate.toDateString() 
      : selectedDate;

    setTimeout(() => {
      navigation.navigate("Cart", {
        cart,
        customerName: customerName.trim(),
        phone: phone.trim(),
        selectedDate: formattedDate,
        selectedTime,
        delivery,
        address: address.trim(),
        location,
      });
      setLoading(false);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pickup Details</Text>
          <Text style={styles.headerSubtitle}>Please fill in your information</Text>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={[styles.inputBox, !customerName.trim() && styles.errorInput]}
            placeholder="Enter your full name"
            value={customerName}
            onChangeText={setCustomerName}
            maxLength={50}
          />

          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={[styles.inputBox, !phone.trim() && styles.errorInput]}
            placeholder="Enter phone number (e.g., 03001234567)"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={15}
          />
        </View>

        {/* Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Address</Text>
          
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={[styles.inputBox, styles.multilineInput, !address.trim() && styles.errorInput]}
            placeholder="Enter full address or select on map"
            multiline
            value={address}
            onChangeText={setAddress}
            maxLength={200}
          />

          <Text style={styles.label}>Select Pickup Location on Map</Text>
          {locationLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#088F8F" />
              <Text style={styles.loadingText}>Getting your location...</Text>
            </View>
          ) : location?.latitude && location?.longitude ? (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                onPress={handleMapPress}
                showsUserLocation={true}
                showsMyLocationButton={true}
              >
                <Marker
                  coordinate={location}
                  title="Pickup Location"
                  description={address}
                  pinColor="#088F8F"
                />
              </MapView>
              <View style={styles.mapInfo}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.coordinatesText}>
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </Text>
              </View>
            </View>
          ) : (
            <Pressable style={styles.retryLocationButton} onPress={getCurrentLocation}>
              <Ionicons name="location-outline" size={20} color="#088F8F" />
              <Text style={styles.retryLocationText}>Tap to get location</Text>
            </Pressable>
          )}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup Schedule</Text>
          
          <Text style={styles.label}>Pick Up Date *</Text>
          <View style={styles.datePickerContainer}>
            <HorizontalDatepicker
              mode="gregorian"
              startDate={new Date()}
              endDate={new Date("2025-12-31")}
              initialSelectedDate={selectedDate}
              onSelectedDateChange={setSelectedDate}
              selectedItemWidth={170}
              unselectedItemWidth={38}
              itemHeight={38}
              itemRadius={10}
              selectedItemTextStyle={styles.selectedItemTextStyle}
              unselectedItemTextStyle={styles.unselectedItemTextStyle}
              selectedItemBackgroundColor="#088F8F"
              unselectedItemBackgroundColor="#ececec"
            />
          </View>

          <Text style={styles.label}>Select Time *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {times.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedTime(item.time)}
                style={[
                  styles.optionButton,
                  selectedTime === item.time && styles.selectedOption,
                ]}
              >
                <Text style={[
                  styles.optionText,
                  selectedTime === item.time && styles.selectedOptionText
                ]}>
                  {item.time}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.label}>Delivery Time *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {deliveryTime.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setDelivery(item.name)}
                style={[
                  styles.optionButton,
                  delivery === item.name && styles.selectedOption,
                ]}
              >
                <Text style={[
                  styles.optionText,
                  delivery === item.name && styles.selectedOptionText
                ]}>
                  {item.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Fixed bottom section */}
      {total > 0 && (
        <View style={styles.bottomSection}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartText}>
              {cart.length} items | Rs {total}
            </Text>
            <Text style={styles.cartSubtext}>
              Total amount for laundry service
            </Text>
          </View>
          <Pressable
            style={[styles.proceedButton, loading && styles.disabledButton]}
            onPress={handleProceedToCart}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.proceedText}>Proceed to Cart</Text>
            )}
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContent: {
    paddingBottom: 140,
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
  },
  inputBox: {
    padding: 15,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  errorInput: {
    borderColor: "#ff4444",
  },
  
  mapContainer: {
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },
  map: {
    height: 200,
  },
  mapInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f9fa",
    gap: 5,
  },
  coordinatesText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
  
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginTop: 10,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  
  retryLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    marginTop: 10,
    gap: 10,
  },
  retryLocationText: {
    color: "#088F8F",
    fontSize: 16,
    fontWeight: "500",
  },
  
  datePickerContainer: {
    marginVertical: 10,
  },
  selectedItemTextStyle: {
    fontWeight: "600",
    color: "#fff",
  },
  unselectedItemTextStyle: {
    color: "#666",
  },
  
  horizontalScroll: {
    marginVertical: 10,
  },
  optionButton: {
    marginRight: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  selectedOption: {
    backgroundColor: "#088F8F",
    borderColor: "#088F8F",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
    fontWeight: "600",
  },
  
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    elevation: 5,
  },
  cartInfo: {
    marginBottom: 15,
  },
  cartText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  cartSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  proceedButton: {
    backgroundColor: "#088F8F",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  proceedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});



