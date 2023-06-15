import { View, Text } from 'react-native';
import STYLES from '../styles/Styles';
import COLORS from '../../../settings/Colors';

export default _Divider = props => {
  return (
    <View
      style={[
        STYLES.divider,
        STYLES.signUpDivider,
      ]}
    >
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
            color: COLORS[props.color]
          }
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
