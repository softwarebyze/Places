import { View } from "react-native";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
const terms = TERMS["English"];

const Details = () => {
  const navigator = useNavigation();
  return (
    <View style={STYLES.suliContinues}>
      <_Input
        labelText={"Phone Number"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Gender"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Date of Birth"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Password"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Confirm Password"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />

      <_Button
        text={terms["0017"]}
        action={() => navigator.replace("ChooseLocation")}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={false}
      />
    </View>
  );
};

export default Details;
