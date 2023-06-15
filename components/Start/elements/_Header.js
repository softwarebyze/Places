import { View, Pressable, Text } from 'react-native';
import STYLES from '../styles/Styles';

export default _Header = props => {
  return (
    <View
      style={[
        STYLES.d1Box,
        STYLES.suliHeader,
      ]}
    >
      <Text
        style={STYLES.suliHeaderText}
      >
        {props.text}
      </Text>
      <Pressable
        onPress={props.action}
      >
        <Text
          style={STYLES.temp_suliX}
        >
             X   
        </Text>
      </Pressable>
    </View>
  );
};
