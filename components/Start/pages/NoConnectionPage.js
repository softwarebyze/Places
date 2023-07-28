import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
const terms = TERMS["English"];

const NoConnectionPage = (props) => {
  const netInfo = useNetInfo();
  const navigator = useNavigation();
  return (
    <View>
      <_Header text={terms["0037"]} />
    </View>
  );
};
export default NoConnectionPage;
