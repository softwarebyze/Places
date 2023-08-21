import { View, Text, TextInput } from "react-native";
import STYLES from "../styles/Styles";
import COLORS from "../../settings/Colors";

const _Input = (props) => {
  return (
    <View style={props.style}>
      <Text style={[STYLES.inputLabel]}>{props.labelText}</Text>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChangeText={props.onChangeText}
        autoCapitalize="none"
        style={[
          STYLES.d2Box,
          {
            borderColor: COLORS[props.borderColor],
            borderRadius: 10,
            padding: 10,
            fontSize: 17,
          },
        ]}
      />
      <Text
        style={[
          STYLES.inputSubtext,
          {
            color: COLORS[props.subtextColor],
          },
        ]}
      >
        {props.subtextText}
      </Text>
    </View>
  );
};

export default _Input;
