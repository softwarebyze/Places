import { View } from "react-native";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const terms = TERMS["English"];

const InterestsPage = () => {
  const navigator = useNavigation();
  return (
    <View>
      <_Button
        text={terms["0019"]}
        action={() => navigator.goBack()}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
        style={STYLES.startButton}
      />
      <Text style={STYLES.welcomeText}>{terms["0021"]}</Text>
      <Text>{terms["0024"]}</Text>
      <Text>{terms["0025"]}</Text>
      <_Button
        text="Continue"
        action={() => navigator.navigate("Home")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
        style={STYLES.startButton}
      />
    </View>
  );
};

export default InterestsPage;
