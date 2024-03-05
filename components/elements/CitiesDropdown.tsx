import { View } from "react-native";

import _Dropdown from "./_Dropdown";
import { useCities } from "../../firebase/hooks/useCities";
import Styles from "../styles/Styles";

const CitiesDropdown = ({ onSelect, citiesToExclude = [] }) => {
  const { data: cities } = useCities();
  const citiesToChoose = cities.filter(
    (city) => !citiesToExclude.includes(city),
  );

  const choices = citiesToChoose.map((city) => ({
    label: city,
    value: city,
  }));
  return (
    <View style={Styles.dropdownMargin}>
      <_Dropdown
        labelText=""
        label="Choose a Location"
        options={choices}
        onSelect={onSelect}
      />
    </View>
  );
};

export default CitiesDropdown;
