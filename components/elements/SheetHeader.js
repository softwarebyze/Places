import Styles from "../styles/Styles";
import { View, Text, TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import Colors from "../../settings/Colors";

const SheetHeader = (props) => (
  <View style={Styles.sheetHeader}>
    <Text style={Styles.suliHeaderText}>Request New Interest</Text>
    <TouchableOpacity onPress={props.handleClose}>
      <Octicons name="x-circle-fill" size={24} color={Colors.orange} />
    </TouchableOpacity>
  </View>
);

export default SheetHeader;
