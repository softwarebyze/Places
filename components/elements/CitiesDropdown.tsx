import { View } from "react-native";

import _Dropdown from "./_Dropdown";
import Styles from "../styles/Styles";

const cities = [
  { label: "New York City, USA", value: "New York City, USA" },
  { label: "Tel Aviv, Israel", value: "Tel Aviv, Israel" },
  { label: "Herzilya, Israel", value: "Herzilya, Israel" },
];

const CitiesDropdown = (props) => (
  <View style={Styles.dropdownMargin}>
    <_Dropdown
      labelText=""
      label="Choose a Location"
      options={cities}
      onSelect={props.onSelect}
    />
  </View>
);

export default CitiesDropdown;
