import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import COLORS from "../../settings/Colors";
import STYLES from "../styles/Styles";

const _Input = (props) => {
  const [text, setText] = useState(props.value ?? "");
  const isValid = typeof props.isValid === "undefined" ? true : props.isValid;
  const [isFocused, setIsFocused] = useState(false);
  const handleTextChange = (text: string) => {
    setText(text);
    props.onChangeText(text);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={props.style}>
      <Text style={[STYLES.inputLabel]}>{props.labelText}</Text>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        placeholderTextColor={COLORS["primary1_030"]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleTextChange}
        autoCapitalize="none"
        value={text}
        style={[
          STYLES.d2Box,
          {
            borderColor:
              COLORS[
                text && !isValid
                  ? "error_080"
                  : isFocused
                  ? "primary1_100"
                  : "primary1_030"
              ],
            borderRadius: 10,
            padding: 10,
            fontSize: 17,
          },
        ]}
        {...props}
      />
      {text && !isValid && props.subtextText && (
        <Text
          style={[
            STYLES.inputSubtext,
            {
              color: COLORS[text && !isValid ? "error_080" : "clear_000"],
            },
          ]}
        >
          {props.subtextText}
        </Text>
      )}
    </View>
  );
};

export default _Input;
