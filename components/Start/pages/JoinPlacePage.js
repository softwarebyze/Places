import { View } from "react-native";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const terms = TERMS["English"];

const JoinPlacePage = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={STYLES.page}>
      <Text style={STYLES.sloganText}>{terms["0028"]}</Text>

      <_Button
        text={terms["0029"]}
        action={() => navigator.navigate("Category")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      <_Button
        text={terms["0030"]}
        action={() => navigator.navigate("Category")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      <_Button
        text={terms["0031"]}
        action={() => navigator.navigate("Category")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      <_Button
        text={terms["0032"]}
        action={() => navigator.navigate("Category")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
    </SafeAreaView>
  );
};

export default JoinPlacePage;
