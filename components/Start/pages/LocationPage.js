import { View } from "react-native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const terms = TERMS["English"];

const LocationPage = () => {
  const navigator = useNavigation();
  return (
    <View>
      <_Button
        text={terms["0019"]}
        action={() => navigator.navigate("ChooseLocation")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
        style={STYLES.startButton}
      />
      <Text style={STYLES.welcomeText}>{terms["0018"]}</Text>
      <Text style={STYLES.sloganText}>{terms["0020"]}</Text>
      <_Input
        labelText={"Country"}
        onFocus={() => setPasswordFocusState(true)}
        onBlur={() => setPasswordFocusState(false)}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"State / Province"}
        onFocus={() => setPasswordFocusState(true)}
        onBlur={() => setPasswordFocusState(false)}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"City"}
        onFocus={() => setPasswordFocusState(true)}
        onBlur={() => setPasswordFocusState(false)}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />

      <_Button
        text={terms["0008"]}
        action={() => navigator.navigate("ChooseInterests")}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={true}
      />
    </View>
  );
};
export default LocationPage;
