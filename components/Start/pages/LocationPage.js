import { Pressable, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Collapsible from "react-native-collapsible";
import Colors from "../../../settings/Colors";
const terms = TERMS["English"];

const LocationPage = () => {
  const navigator = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [location, setLocation] = useState("");

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <SafeAreaView style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={[STYLES.descriptionText, { marginHorizontal: 30 }]}>
        {terms["0020"]}
      </Text>
      <View style={STYLES.dropdownMargin}>
        <Pressable onPress={toggleDropdown}>
          <Text
            style={[
              STYLES.dropdownHeader,
              !isCollapsed ? STYLES.blueBorder : "",
              location.length > 0 ? STYLES.blackText : "",
            ]}
          >
            {location.length > 0 ? location : "Choose a Location"}
          </Text>
        </Pressable>
        <Collapsible collapsed={isCollapsed}>
          <View style={[STYLES.blueBorder, STYLES.backgroundWhite]}>
            <TouchableOpacity
              style={STYLES.dropdownItem}
              onPress={() => {
                setLocation("New York City, USA");
                toggleDropdown();
              }}
            >
              <Text>New York City, USA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={STYLES.dropdownItem}
              onPress={() => {
                setLocation("Tel Aviv, Israel");
                toggleDropdown();
              }}
            >
              <Text>Tel Aviv, Israel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={STYLES.dropdownItem}
              onPress={() => {
                setLocation("Herzilya, Israel");
                toggleDropdown();
              }}
            >
              <Text>Herzilya, Israel</Text>
            </TouchableOpacity>
          </View>
        </Collapsible>
      </View>

      <_Button
        text={terms["0008"]}
        action={() => navigator.navigate("ChooseInterests")}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={false}
      />
    </SafeAreaView>
  );
};
export default LocationPage;
