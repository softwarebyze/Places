import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import Collapsible from "react-native-collapsible";

import Styles from "../styles/Styles";

const _Dropdown = (props) => {
  /*
   * labelText is shown above the dropdown
   * label is shown in the dropdown header when no option is selected
   * options is an array with objects of the form {label: "label", value: "value"}
   * onSelect is a function that takes the value of the selected option as an argument
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
            {props.options.map(({ label, value }) => (
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
