import { Octicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

import Colors from "@/settings/Colors";
import Styles from "@/styles/Styles";

const SheetHeader = (props) => (
  <View style={Styles.sheetHeader}>
    <Text style={Styles.suliHeaderText}>{props.sheetHeaderText}</Text>
    <TouchableOpacity onPress={props.handleClose}>
      <Octicons name="x-circle-fill" size={24} color={Colors.orange} />
    </TouchableOpacity>
  </View>
);

export default SheetHeader;
