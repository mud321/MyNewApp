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

  // ✅ Get cart from Redux
  const cart = useSelector((state) => state.cart.cart || []);
  const total = cart.reduce(
    (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
    0
  );

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
          "Permission Required",
          "Allow location access to continue."
        );
        setLocationLoading(false);
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      const coords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setLocation(coords);
      await fetchAddress(coords);
    } catch (err) {
      console.log("Location Error:", err);
    } finally {
      setLocationLoading(false);
    }
  };

  const fetchAddress = async (coords) => {
    try {
      const geo = await Location.reverseGeocodeAsync(coords);
      if (geo.length > 0) {
        const a = geo[0];
        const full = [
          a.name,
          a.street,
          a.city,
          a.region,
          a.country,
        ]
          .filter(Boolean)
          .join(", ");
        setAddress(full);
      }
    } catch (err) {
      console.log("Geocode error:", err);
    }
  };

  const handleMapPress = async (event) => {
    const coords = event.nativeEvent.coordinate;
    setLocation(coords);
    await fetchAddress(coords);
  };

  const handleProceedToCart = () => {
    if (!customerName || !phone || !selectedDate || !selectedTime || !delivery || !address) {
      Alert.alert("Fill all fields", "Please complete all pickup details");
      return;
    }

    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items before proceeding");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigation.navigate("Cart", {
        cart,
        total,
        customerName,
        phone,
        selectedDate: selectedDate.toDateString(),
        selectedTime,
        delivery,
        address,
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
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter your name"
            value={customerName}
            onChangeText={setCustomerName}
          />

          <Text style={styles.label}>Phone *</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="03001234567"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Address + Map */}
        <View style={styles.section}>
          <Text style={styles.label}>Address *</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter full address"
            value={address}
            onChangeText={setAddress}
          />
          {location && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={handleMapPress}
            >
              <Marker coordinate={location} />
            </MapView>
          )}
        </View>

        {/* Date + Time + Delivery */}
        <View style={styles.section}>
          <Text style={styles.label}>Pickup Date *</Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date()}
            endDate={new Date("2025-12-31")}
            initialSelectedDate={selectedDate}
            onSelectedDateChange={setSelectedDate}
          />

          <Text style={styles.label}>Pickup Time *</Text>
          <ScrollView horizontal>
            {times.map((t) => (
              <Pressable
                key={t.id}
                onPress={() => setSelectedTime(t.time)}
                style={[
                  styles.optionButton,
                  selectedTime === t.time && styles.selectedOption,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedTime === t.time && { color: "#fff" },
                  ]}
                >
                  {t.time}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <Text style={styles.label}>Delivery Time *</Text>
          <ScrollView horizontal>
            {deliveryTime.map((d) => (
              <Pressable
                key={d.id}
                onPress={() => setDelivery(d.name)}
                style={[
                  styles.optionButton,
                  delivery === d.name && styles.selectedOption,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    delivery === d.name && { color: "#fff" },
                  ]}
                >
                  {d.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom */}
      {cart.length > 0 && (
        <View style={styles.bottomSection}>
          <Text style={styles.cartText}>
            {cart.length} items | Rs {total}
          </Text>
          <Pressable
            style={styles.proceedButton}
            onPress={handleProceedToCart}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
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
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  scrollContent: { paddingBottom: 140 },
  header: { padding: 20, alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  section: { backgroundColor: "#fff", padding: 15, margin: 10, borderRadius: 10 },
  label: { marginTop: 10, fontWeight: "600" },
  inputBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  map: { height: 200, marginTop: 10 },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    margin: 5,
  },
  selectedOption: { backgroundColor: "#088F8F", borderColor: "#088F8F" },
  optionText: { color: "#333" },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartText: { fontSize: 16, fontWeight: "600" },
  proceedButton: {
    backgroundColor: "#088F8F",
    padding: 12,
    borderRadius: 8,
  },
  proceedText: { color: "#fff", fontWeight: "bold" },
});



