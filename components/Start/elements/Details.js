import _Button from "./_Button";
import _Input from "./_Input";
import _Header from "./_Header";
import _Divider from "./_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-input";
import { Text, View } from "react-native";
import { useRef, useState } from "react";
import Colors from "../../../settings/Colors";
const terms = TERMS["English"];

const Details = () => {
  const navigator = useNavigation();
  const phoneRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <SafeAreaView style={[STYLES.suliContinues, STYLES.page]}>
      <_Input
        labelText={"First Name"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Last Name"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <View style={STYLES.signUpInput}>
        <Text style={[STYLES.d1Box, STYLES.inputLabel]}>{"Phone Number"}</Text>
        <View
          style={[
            STYLES.d2Box,
            {
              borderRadius: 10,
              padding: 10,
              fontSize: 17,
              borderColor: Colors.primary1_100,
              justifyContent: "center",
            },
          ]}
        >
          <PhoneInput
            initialCountry={"us"}
            ref={phoneRef}
            onChangePhoneNumber={setPhoneNumber}
          />
        </View>
      </View>
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
      <_Button
        text={terms["0017"]}
        action={() => navigator.navigate("ChooseLocation")}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={false}
      />
    </SafeAreaView>
  );
};

export default Details;
