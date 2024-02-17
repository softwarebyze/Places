import React, { useState } from "react";
import { View, Text } from "react-native";

import CitiesDropdown from "./CitiesDropdown";
import _Button from "./_Button";
import Styles from "../styles/Styles";

const AddCityForm = ({ handleAddCity, currentCities = [] }) => {
  const [city, setCity] = useState(null);

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
        <CitiesDropdown onSelect={setCity} citiesToExclude={currentCities} />
        <_Button
          action={() => handleAddCity(city)}
          text="Add City"
          disabled={!city}
        />
      </View>
    </View>
  );
};
export default AddCityForm;
