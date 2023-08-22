import { Pressable, Text } from "react-native";
import STYLES from "../styles/Styles";
import COLORS from "../../settings/Colors";

const _Button = (props) => {
  const type = props.type || "primary";
  const disabled = props.disabled || false;
  return (
    <Pressable
      onPress={props.action}
      disabled={disabled}
      style={[
        STYLES.d2Box,
        STYLES.button,
        {
          backgroundColor: COLORS[props.color],
          borderColor: COLORS[props.borderColor],
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
            textDecorationLine: props.underline ? "underline" : "none",
          },
        ]}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};

export default _Button;

// color: (type === "secondary" && !disabled) ? blue : white
