import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import CitiesDropdown from "./CitiesDropdown";
import _Button from "./_Button";
import { fetchUsersCities, addUserCity } from "../../firebase/users";
import Colors from "../../settings/Colors";
import Styles from "../styles/Styles";

const AddCityForm = () => {
  const [city, setCity] = useState(null);
  const [usersCities, setUsersCities] = useState([]);

  const handleAddCity = async () => {
    try {
      await addUserCity(city);
      setCity(null);
      const cities = await fetchUsersCities();
      setUsersCities(cities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAndSetUsersCities = async () => {
      try {
        const cities = await fetchUsersCities();
        setUsersCities(cities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndSetUsersCities();
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
      {/* <Text style={Styles.groupLabelText}>Your Cities</Text>
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
        {usersCities.map((city) => (
          <View style={styles.usersCityButton} key={city}>
            <Text style={styles.usersCityButtonText}>{city}</Text>
          </View>
        ))}
      </View> */}
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
