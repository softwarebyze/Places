import { View, Text } from "react-native";

import COLORS from "@/settings/Colors";
import STYLES from "@/styles/Styles";

const _Divider = (props) => {
  return (
    <View style={[STYLES.divider, STYLES.signUpDivider]}>
      <View
        style={[
          STYLES.line,
          {
            backgroundColor: COLORS[props.color],
          },
        ]}
      />
      <Text
        style={[
          STYLES.dividerText,
          {
            color: COLORS[props.color],
          },
        ]}
      >
        {props.text}
      </Text>
      <View
        style={[
          STYLES.line,
          {
            backgroundColor: COLORS[props.color],
          },
        ]}
      />
    </View>
  );
};

export default _Divider;
