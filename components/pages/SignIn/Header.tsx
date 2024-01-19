import { Ionicons } from "@expo/vector-icons";
import { View, Pressable, Text, StyleSheet } from "react-native"; // import Text here

import COLORS from "../../../settings/Colors";

export const Header = ({ text, action }) => {
  return (
    <View style={[styles.header]}>
      <Text style={styles.headerText}>{text}</Text>
      <Pressable onPress={action} style={{ padding: 10 }}>
        <Ionicons name="close" size={24} color={COLORS.black_070} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerText: {
    color: COLORS.secondary_100,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 28.8,
  },
});
