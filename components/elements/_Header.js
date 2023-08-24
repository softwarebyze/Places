import { Ionicons } from "@expo/vector-icons";
import { View, Pressable, Text } from "react-native"; // import Text here

import COLORS from "../../settings/Colors";
import STYLES from "../styles/Styles";

const _Header = (props) => {
  return (
    <View style={[STYLES.d1Box, STYLES.suliHeader]}>
      <Text style={STYLES.suliHeaderText}>{props.text}</Text>
      <Pressable onPress={props.action} style={{ padding: 10 }}>
        <Ionicons name="close" size={24} color={COLORS.black_070} />
      </Pressable>
    </View>
  );
};

export default _Header;
