import { Pressable, Text } from 'react-native';
import STYLES from '../styles/Styles';
import COLORS from '../../../settings/Colors';

export default _Button = props => {
  return (
    <Pressable
      onPress={props.action}
      disabled={props.disabled}
      style={[
        STYLES.d2Box,
        STYLES.button,
        {
          backgroundColor: COLORS[props.color],
          borderColor: COLORS[props.borderColor],
        },
        props.style,
      ]}
    >
      <Text
        style={[
          STYLES.buttonText,
          {
            color: COLORS[props.textColor],
            textDecorationLine: props.underline ? 'underline' : 'none',
          },
        ]}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};
