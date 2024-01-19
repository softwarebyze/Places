import { useState } from "react";
import { View, Text, TextInput, ViewStyle, StyleSheet } from "react-native";

import COLORS from "../../settings/Colors";
import STYLES from "../styles/Styles";

interface InputProps {
  value?: string;
  isValid?: boolean;
  onChangeText: (text: string) => void;
  style?: ViewStyle;
  labelText: string;
  secureTextEntry?: boolean;
  placeholder?: string;
  subtextText?: string;
}

export const Input = ({
  value,
  isValid = true,
  onChangeText,
  labelText,
  subtextText,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View>
      <Label labelText={labelText} />
      <TextInput
        // showSoftInputOnFocus={false}
        style={[
          styles.input,
          {
            borderColor:
              COLORS[
                value && !isValid
                  ? "error_080"
                  : isFocused
                  ? "primary1_100"
                  : "primary1_030"
              ],
          },
        ]}
        placeholderTextColor={COLORS["primary1_030"]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        autoCapitalize="none"
        value={value}
        {...props}
      />
      {value && !isValid && subtextText && (
        <Text
          style={[
            styles.inputSubtext,
            {
              color: COLORS[value && !isValid ? "error_080" : "clear_000"],
            },
          ]}
        >
          {subtextText}
        </Text>
      )}
    </View>
  );
};

export const Label = ({ labelText }: { labelText: string }) => (
  <Text style={styles.label}>{labelText}</Text>
);

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 17,
    ...STYLES.inputPadding,
  },
  label: {
    color: COLORS.secondary_100,
    fontSize: 18,
    fontWeight: "400",
  },
  inputSubtext: {
    fontSize: 13,
    fontWeight: "400",
  },
});
