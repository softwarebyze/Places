import { View, TouchableOpacity, useRoute, Text } from "react-native";
import _Button from "../elements/_Button";
import _Header from "../elements/_Header";

const ChannelInfoPage = (props) => {
  return (
    <View>
      <_Header />
      <Text>This is the beginning of {props.name} place</Text>
      <_Button />
    </View>
  );
};

export default ChannelInfoPage;
