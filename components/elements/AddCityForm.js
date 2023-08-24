import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Styles from "../styles/Styles";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import CitiesDropdown from "./CitiesDropdown";

const AddCityForm = () => {
  const [city, setCity] = useState(null);
  const [usersCities, setUsersCities] = useState([]);

  useEffect(() => {
    const fetchUsersCities = async () => {
      try {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        console.log("cities:", userSnap.data().cities);
        if (userSnap.exists()) {
          setUsersCities(() => {
            const cities = userSnap.data().cities || [userSnap.data().location];
            return cities.map((city, i) => ({
              city: city,
              id: Date.now() + i + Math.random(),
            }));
          });
        } else {
          throw new Error("No user found");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsersCities();
  }, []);
  return (
    <View>
      <Text style={Styles.groupLabelText}>Add a City</Text>
      <CitiesDropdown onSelect={setCity} />
      <Text style={Styles.groupLabelText}>Your Cities</Text>
      <View style={{ display: "flex", alignItems: "flex-start", padding: 5 }}>
        {usersCities.map(({ city, id }) => (
          <View style={styles.usersCityButton} key={id}>
            <Text style={styles.usersCityButtonText}>{city}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addACity: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
    borderColor: Colors.dark_grey,
  },
  addACityText: {
    color: Colors.dark_grey,
    fontSize: 14,
    fontWeight: "600",
  },
  usersCityButton: {
    borderWidth: 1.5,
    padding: 12,
    borderRadius: 4,
    borderColor: Colors.orange,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  usersCityButtonText: {
    color: Colors.orange,
    fontSize: 16,
    fontWeight: "600",
  },
  removeButton: {
    fontSize: 25,
  },
});
export default AddCityForm;
