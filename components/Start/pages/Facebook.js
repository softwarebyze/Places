import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import _Input from "../elements/_Input";
import { useNavigation } from "@react-navigation/native";
const terms = TERMS["English"];

const Facebook = (props) => {
  const navigator = useNavigation();
  return (
    <View>
      <Text style={STYLES.welcomeText}>{terms["0035"]}</Text>
      <Text style={STYLES.sloganText}>{terms["0036"]}</Text>

      <_Input
        labelText={"Email or Phone: "}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />

      <_Input
        labelText={"Password: "}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />

      <_Button
        text={terms["0016"]}
        action={() => navigator.navigate("ChooseLocation")}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={false}
      />
      <Text style={STYLES.sloganText}>forgot account?</Text>

      <Text style={STYLES.sloganText}>Create New Account</Text>
    </View>
  );
};

export default Facebook;
