import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
import TERMS from "../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
const terms = TERMS["English"];

const StartPage = (props) => {
  const navigator = useNavigation();
  return (
    <View style={[STYLES.page, STYLES.spaceEvenly]}>
      <_Logo style={[STYLES.fullLogo, STYLES.startFullLogo]} />
      <View>
        <Text style={STYLES.welcomeText}>{terms["0001"]}</Text>
        <Text style={STYLES.sloganText}>{terms["0002"]}</Text>
      </View>
      <View>
        <_Button
          text={terms["0003"]}
          action={() => navigator.navigate("Signup")}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
          style={STYLES.startButton}
        />
        <_Button
          text={terms["0004"]}
          action={() => navigator.navigate("Login")}
          buttonColor="white_100"
          buttonBorderColor="black_100"
          textColor="primary1_100"
          style={STYLES.startButton}
        />
      </View>
    </View>
  );
};
export default StartPage;
