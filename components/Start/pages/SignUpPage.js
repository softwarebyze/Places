import { Text, View } from "react-native";
import _Header from "../elements/_Header";
import _Navigator from "../elements/_Navigator";
import TERMS from "../../../settings/Terms";
import EmailPassword from "./EmailPassword";
import { useNavigation } from "@react-navigation/native";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];

const SignUpPage = () => {
  const navigator = useNavigation();

  return (
    <View style={STYLES.page}>
      <_Header
        text={terms["0005"]}
        action={() => navigator.navigate("Start")}
      />
      <EmailPassword />
      <_Button
        text={terms["0013"]}
        action={() => navigator.replace("Login")}
        color="white_100"
        borderColor="white_100"
        textColor="primary1_100"
        underline={true}
      />
      <Text style={{ fontSize: 2000000 }}>Hi</Text>
    </View>
  );
};

export default SignUpPage;
