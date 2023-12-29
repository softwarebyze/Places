import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

import TERMS from "../../settings/Terms";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
const terms = TERMS["English"];

const StartPage = () => {
  const navigator = useNavigation();
  return (
    <View style={[STYLES.page, STYLES.spaceEvenly]}>
      <_Logo style={[STYLES.fullLogo]} />
      <View>
        <Text style={styles.welcomeText}>{terms["0001"]}</Text>
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

const styles = StyleSheet.create({
  welcomeText: {
    fontStyle: "normal",
    fontSize: 32,
    fontWeight: "600",
    lineHeight: 48,
    textAlign: "center",
  },
});

export default StartPage;
