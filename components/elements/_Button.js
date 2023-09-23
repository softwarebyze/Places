import { Text, TouchableOpacity } from "react-native";

import COLORS from "../../settings/Colors";
import STYLES from "../styles/Styles";

const _Button = (props) => {
  const type = props.type || "primary";
  const disabled = props.disabled || false;
  return (
    <TouchableOpacity
      onPress={props.action}
      disabled={disabled}
      style={[
        STYLES.d2Box,
        STYLES.button,
        {
          backgroundColor: disabled
            ? COLORS.primary1_030
            : type === "primary"
            ? COLORS.primary1_100
            : COLORS.white_100,
          borderColor: disabled ? COLORS.primary1_030 : COLORS.primary1_100,
          borderRadius: 10,
        },
        props.style,
      ]}
    >
      <Text
        style={[
          STYLES.buttonText,
          {
            color:
              type === "secondary" && !disabled
                ? COLORS.primary1_100
                : COLORS.white_100,
          },
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default _Button;
