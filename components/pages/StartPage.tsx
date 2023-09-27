import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";

import TERMS from "../../settings/Terms";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
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
          style={STYLES.startButton}
        />
        <_Button
          type="secondary"
          text={terms["already_have_an_account"]}
          action={() => navigator.navigate("Login")}
          style={STYLES.startButton}
        />
      </View>
    </View>
  );
};
export default StartPage;
