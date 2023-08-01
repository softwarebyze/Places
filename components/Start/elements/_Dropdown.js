import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React from "react";
import Styles from "../styles/Styles";
import { useState } from "react";
import Collapsible from "react-native-collapsible";
import { Ionicons } from "@expo/vector-icons";

const _Dropdown = (props) => {
  /**
   *
   */
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("");

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <View>
      <Text style={[Styles.inputLabel]}>{props.labelText}</Text>
      <View>
        <Pressable
          style={[
            Styles.blueBorder,
            selected.length > 0 ? Styles.blackText : "",
            Styles.dropdownHeader,
            isCollapsed ? Styles.borderRadii : Styles.topBorderRadii,
            !isCollapsed && Styles.dropdownHeaderActive,
            {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
          onPress={toggleDropdown}
        >
          <Text>{selected.length > 0 ? selected : props.label}</Text>
          {isCollapsed ? (
            <Ionicons name="chevron-down-outline" size={24} />
          ) : (
            <Ionicons name="chevron-up-outline" size={24} />
          )}
        </Pressable>
        <Collapsible collapsed={isCollapsed}>
          <View style={[Styles.blueBorder]}>
            {props.data.map(({ label, value }) => (
              <TouchableOpacity
                style={Styles.dropdownItem}
                onPress={() => {
                  setSelected(value);
                  toggleDropdown();
                  props.onSelect(value);
                }}
                key={value}
              >
                <Text>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Collapsible>
      </View>
    </View>
  );
};

export default _Dropdown;
