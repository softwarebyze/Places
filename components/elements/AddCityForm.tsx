import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import CitiesDropdown from "./CitiesDropdown";
import _Button from "./_Button";
import { useAddCity } from "../../firebase/hooks/useAddCity";
import Colors from "../../settings/Colors";
import Styles from "../styles/Styles";

const AddCityForm = ({
  currentCities = [],
  onAddCity = (city: string) => {},
}) => {
  const [city, setCity] = useState(null);
  const { mutate: addCity, isPending, isSuccess, isError } = useAddCity();

  // if (isSuccess) {
  //   setCity(null);
  // }
  const handleAddCity = async (city: string) => {
    addCity(city);
    setCity(null);
    onAddCity(city);
  };

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
        {isPending ? (
          <ActivityIndicator size="small" color={Colors.primary1_100} />
        ) : (
          <_Button
            action={() => handleAddCity(city)}
            text="Add City"
            disabled={!city}
          />
        )}
      </View>
    </View>
  );
};
export default AddCityForm;
