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
import { SafeAreaView } from "react-native-safe-area-context";
const terms = TERMS["English"];

const LocationPage = () => {
  const navigator = useNavigation();
  return (
    <SafeAreaView style={STYLES.page}>
      <Text style={STYLES.descriptionText}>{terms["0020"]}</Text>
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
        underline={false}
      />
    </SafeAreaView>
  );
};
export default LocationPage;
