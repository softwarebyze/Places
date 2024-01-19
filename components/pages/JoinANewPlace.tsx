import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity } from "react-native";
import Colors from "../../settings/Colors";
import { HomePageProps } from "../navigation/types";
import { terms } from "./HomePage";

export const JoinANewPlace = (props) => {
  const navigation = useNavigation<HomePageProps["navigation"]>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("JoinPlace", { location: props.location })
      }
      style={{
        backgroundColor: Colors.white_100,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="add" size={24} color={Colors.orange} />
        <Text
          style={{
            color: Colors.orange,
            fontWeight: "600",
            fontSize: 16,
            paddingStart: 4,
          }}
        >
          {terms["join_a_new_place"]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
