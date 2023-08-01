import { View } from "react-native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Dropdown from "../elements/_Dropdown";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../settings/Colors";
const terms = TERMS["English"];

const LocationPage = () => {
  const navigator = useNavigation();
  const [location, setLocation] = useState("");

  const disabled = location.length === 0;

  const cities = [
    { label: "New York City, USA", value: "New York City, USA" },
    { label: "Tel Aviv, Israel", value: "Tel Aviv, Israel" },
    { label: "Herzilya, Israel", value: "Herzilya, Israel" },
  ];

  return (
    <SafeAreaView style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={[STYLES.descriptionText, { marginHorizontal: 30 }]}>
        {terms["0020"]}
      </Text>
      <View style={STYLES.dropdownMargin}>
        <_Dropdown
          labelText=""
          label="Choose a Location"
          options={cities}
          onSelect={setLocation}
        />
      </View>

      <_Button
        text={terms["0008"]}
        action={() => navigator.navigate("ChooseInterests")}
        color={disabled ? "primary1_030" : "primary1_100"}
        borderColor={disabled ? "light_grey" : "primary1_100"}
        textColor="white_100"
        underline={false}
        disabled={disabled}
      />
    </SafeAreaView>
  );
};
export default LocationPage;
