import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Colors from "../../settings/Colors";

export const Location = (props) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
    <FontAwesome5 name="map-pin" size={11} color="grey" />
    <Text style={{ color: Colors.dark_grey }}>
      {props.location.split(",")[0]}
    </Text>
  </View>
);
