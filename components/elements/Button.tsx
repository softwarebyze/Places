import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ViewStyle } from "react-native-phone-input";

import COLORS from "../../settings/Colors";
import STYLES from "../styles/Styles";

interface ButtonProps {
  type?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
  action: () => void;
  style?: ViewStyle;
  text: string;
}

export const PButton = ({
  type = "primary",
  loading = false,
  disabled = false,
  action,
  style,
  text,
}: ButtonProps) => {
  const borderColor = disabled ? COLORS.primary1_030 : COLORS.primary1_100;
  const backgroundColor =
    disabled || loading
      ? COLORS.primary1_030
      : type === "primary"
      ? COLORS.primary1_100
      : COLORS.white_100;
  const textColor =
    type === "secondary" && !disabled ? COLORS.primary1_100 : COLORS.white_100;
  return (
    <TouchableOpacity
      onPress={action}
      disabled={disabled}
      style={[
        styles.button,
        STYLES.button,
        {
          backgroundColor,
          borderColor,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            STYLES.buttonText,
            {
              color: textColor,
            },
          ]}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // height: 65,
    // paddingVertical: 24,
    ...STYLES.inputPadding,
    borderWidth: 1,
    borderRadius: 10,
  },
});
