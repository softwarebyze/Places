import { View } from "react-native";
import _Header from "../elements/_Header";
import _Navigator from "../elements/_Navigator";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import EmailPassword from "./EmailPassword";
import { useNavigation } from "@react-navigation/native";
import _Button from "../elements/_Button";

const terms = TERMS["English"];

const LoginPage = () => {
  const navigator = useNavigation();

  return (
    <View style={STYLES.page}>
      <_Header
        text={terms["0016"]}
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
    </View>
  );
};

export default LoginPage;
