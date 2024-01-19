import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";

import { Logo } from "./Logo";
import TERMS from "../../../settings/Terms";
import { PButton } from "../../elements/Button";
import { Page } from "../../elements/Page";
import STYLES from "../../styles/Styles";
const terms = TERMS["English"];

const StartPage = () => {
  const navigator = useNavigation();
  return (
    <Page>
      <Logo />
      <View>
        <Text style={styles.welcomeText}>{terms["Welcome to Places!"]}</Text>
        <Text style={STYLES.sloganText}>
          {terms["Discover. Meet. Belong."]}
        </Text>
      </View>
      {/* <View> */}
      <PButton
        text={terms["Create an account"]}
        action={() => navigator.navigate("Signup")}
        // style={STYLES.startButton}
      />
      {/* disabled */}
      <PButton
        type="secondary"
        text={terms["already_have_an_account"]}
        action={() => navigator.navigate("Login")}
        // style={STYLES.startButton}
      />
      {/* </View> */}
    </Page>
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
