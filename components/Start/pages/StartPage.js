import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
terms = TERMS["English"];

export default StartPage = (props) => {
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
          action={() => props.setPageScreenState("SignUpPage")}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
          style={STYLES.startButton}
        />
        <_Button
          text={terms["0004"]}
          action={() => props.setPageScreenState("LoginPage")}
          buttonColor="white_100"
          buttonBorderColor="black_100"
          textColor="primary1_100"
          style={STYLES.startButton}
        />
      </View>
    </View>
  );
};
