import { View } from "react-native";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
const terms = TERMS["English"];

export default Continues = (props) => {
  return (
    <View style={STYLES.suliContinues}>
      <_Button
        text={terms["0008"]}
        action={() => props.setSubScreenState("Details")}
        color={props.canContinue ? "primary1_100" : "primary1_030"}
        borderColor={props.canContinue ? "primary1_100" : "primary1_030"}
        textColor="white_100"
        j
        disabled={!props.canContinue}
      />
      <_Divider text="or" color="gray1_100" />
      {/* <_Button
            text={terms['0010']}
            action={() => console.log('APPLE NOT READY')}
            color='primary1_100'
            borderColor='primary1_100'
            textColor='white_100'
         /> */}
      <_Button
        text={terms["0011"]}
        action={() => props.setMainScreenState("Google")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      <_Button
        text={terms["0012"]}
        action={() => props.setMainScreenState("Facebook")}
        color="white_100"
        borderColor="primary1_100"
        textColor="primary1_100"
      />
      <_Button
        text={terms["0013"]}
        action={() => props.setPageScreenState("LoginPage")}
        color="white_100"
        borderColor="white_100"
        textColor="primary1_100"
        underline={true}
      />
    </View>
  );
};
