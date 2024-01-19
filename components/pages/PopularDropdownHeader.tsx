import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import Colors from "../../settings/Colors";
import Styles from "../styles/Styles";

export const PopularDropdownHeader = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: Colors.orange,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 6,
    }}
    onPress={props.onPress}
  >
    <Text style={[Styles.whiteText, { fontWeight: "bold" }]}>
      Popular In Your Cities
    </Text>
    {props.isCollapsed ? (
      <Ionicons name="chevron-down-outline" size={24} color="white" />
    ) : (
      <Ionicons name="chevron-up-outline" size={24} color="white" />
    )}
  </TouchableOpacity>
);
