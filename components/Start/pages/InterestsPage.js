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

const InterestsPage = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={STYLES.page}>
      <Text style={STYLES.descriptionText}>{terms["0023"]}</Text>
      <Text>{terms["0024"]}</Text>
      <Text>{terms["0025"]}</Text>
      <_Button
        text="Continue"
        action={() => navigator.navigate("HomeTabs")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
        style={STYLES.startButton}
      />
    </SafeAreaView>
  );
};

export default InterestsPage;
