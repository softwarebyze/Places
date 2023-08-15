import Styles from "../styles/Styles";
import _Divider from "../elements/_Divider.js";
import { View, Image, Text } from "react-native";
import Colors from "../../../settings/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";

const SheetHeader = (props) => {
  const { setShowPopup } = props;
  const cancelButton = () => {
    setShowPopup = false;
    console.log(setShowPopup);
  };
  return (
    <View style={Styles.sheetHeader}>
      <Text style={Styles.suliHeaderText}>Request New Interest</Text>
      <TouchableHighlight onPress={() => setShowPopup(false)}>
        <Image source={require("../../../assets/x-circle.png")} />
      </TouchableHighlight>
    </View>
  );
};

export default SheetHeader;
