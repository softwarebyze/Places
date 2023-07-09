import { View, Pressable, Text } from 'react-native'; // import Text here
import { Ionicons } from '@expo/vector-icons';
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
        style={{ padding: 10 }}
      >
        <Ionicons name="close" size={24} color="black" />
      </Pressable>
    </View>
  );
};
