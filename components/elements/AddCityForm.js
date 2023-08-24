import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Styles from "../styles/Styles";
import Colors from "../../settings/Colors";
import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import CitiesDropdown from "./CitiesDropdown";
import _Button from "./_Button";

const AddCityForm = () => {
  const [city, setCity] = useState(null);
  const [usersCities, setUsersCities] = useState([]);
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
  const handleAddCity = async () => {
    try {
      const auth = getAuth();
      const userId = auth.currentUser?.uid;
      const userRef = doc(db, "users", userId);
      if (!city) throw new Error("No city selected");
      if (usersCities.find((userCity) => userCity.city === city))
        throw new Error("City already added");
      await updateDoc(userRef, {
        cities: arrayUnion(city),
      });
      await fetchUsersCities();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsersCities();
  }, []);

  return (
    <View>
      <Text style={Styles.groupLabelText}>Add a City</Text>
      <CitiesDropdown onSelect={setCity} />
      <_Button action={handleAddCity} text="Add City" disabled={!city} />
      <Text style={Styles.groupLabelText}>Your Cities</Text>
      <View
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: 5,
          flexWrap: "wrap",
          flexDirection: "row",
          gap: 10,
        }}
      >
        {usersCities.map(({ city, id }) => (
          <View style={styles.usersCityButton} key={id}>
            <Text style={styles.usersCityButtonText}>{city}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default AddCityForm;

const styles = StyleSheet.create({
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
