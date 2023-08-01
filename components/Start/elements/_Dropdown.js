import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Styles from "../styles/Styles";

const _Dropdown = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [location, setLocation] = useState("");

  const disabled = location.length === 0;

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <View style={Styles.dropdownMargin}>
      <Pressable onPress={toggleDropdown}>
        <Text
          style={[
            Styles.dropdownHeader,
            !isCollapsed ? Styles.blueBorder : "",
            location.length > 0 ? Styles.blackText : "",
          ]}
        >
          {location.length > 0 ? location : "Choose a Location"}
        </Text>
      </Pressable>
      <Collapsible collapsed={isCollapsed}>
        <View style={[Styles.blueBorder, Styles.backgroundWhite]}>
          <TouchableOpacity
            style={Styles.dropdownItem}
            onPress={() => {
              setLocation("New York City, USA");
              toggleDropdown();
            }}
          >
            <Text>New York City, USA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.dropdownItem}
            onPress={() => {
              setLocation("Tel Aviv, Israel");
              toggleDropdown();
            }}
          >
            <Text>Tel Aviv, Israel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.dropdownItem}
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
  );
};

export default _Dropdown;
