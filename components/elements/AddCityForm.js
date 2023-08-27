import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Styles from "../styles/Styles";
import Colors from "../../settings/Colors";
import CitiesDropdown from "./CitiesDropdown";
import _Button from "./_Button";

import { getAuth } from "firebase/auth";
import { db } from "../../firebaseConfig";

import { arrayUnion, doc, updateDoc } from "firebase/firestore";

import { fetchUsersCities, addUserCity } from "../../firebase/users";

const AddCityForm = () => {
  const [city, setCity] = useState(null);
  const [usersCities, setUsersCities] = useState([]);

  const handleAddCity = async () => {
    try {
      addUserCity(city, usersCities);
      setCity(null);
      fetchUsersCities(setUsersCities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsersCities(setUsersCities);
  }, []);

  return (
    <View>
      <Text style={Styles.groupLabelText}>Add a City</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CitiesDropdown onSelect={setCity} />
        <_Button action={handleAddCity} text="Add City" disabled={!city} />
      </View>
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
