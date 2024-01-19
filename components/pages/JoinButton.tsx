import { Text, TouchableOpacity } from "react-native";
import { styles } from "./HomePage";

export const JoinButton = ({ onSelect }) => (
  <TouchableOpacity onPress={onSelect} style={styles.join}>
    <Text style={styles.joinText}>Join</Text>
  </TouchableOpacity>
);
