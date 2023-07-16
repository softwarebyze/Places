import { View } from "react-native";
import { useState } from "react";
import _Button from "./_Button";
import _Input from "./_Input";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
const terms = TERMS["English"];
import Continues from "./Continues";

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const EmailPassword = () => {
  const [emailFocusState, setEmailFocusState] = useState(false);
  const [emailTextState, setEmailTextState] = useState("");
  const [passwordFocusState, setPasswordFocusState] = useState(false);
  const [passwordTextState, setPasswordTextState] = useState("");

  const emailIsValid = validateEmail(emailTextState);
  const passwordIsValid = validatePassword(passwordTextState);

  return (
    <View style={STYLES.suliMain}>
      <View style={STYLES.suliInputs}>
        <_Input
          labelText={terms["0006"]}
          subtextText={terms["0014"]}
          onFocus={() => setEmailFocusState(true)}
          onBlur={() => setEmailFocusState(false)}
          onChangeText={(input) => setEmailTextState(input)}
          borderColor={
            emailTextState && !emailIsValid
              ? "error_080"
              : emailFocusState
              ? "primary1_100"
              : "primary1_030"
          }
          subtextColor={
            emailTextState && !emailIsValid
              ? "error_080"
              : emailFocusState
              ? "clear_000"
              : "clear_000"
          }
        />
        <_Input
          secureTextEntry={true}
          labelText={terms["0007"]}
          subtextText={terms["0015"]}
          onFocus={() => setPasswordFocusState(true)}
          onBlur={() => setPasswordFocusState(false)}
          onChangeText={(input) => setPasswordTextState(input)}
          borderColor={
            passwordTextState && !passwordIsValid
              ? "error_100"
              : passwordFocusState
              ? "primary1_100"
              : "primary1_030"
          }
          subtextColor={
            emailTextState && !passwordIsValid
              ? "primary1_030"
              : passwordFocusState
              ? "primary1_030"
              : "clear_000"
          }
        />
        <Continues canContinue={emailIsValid && passwordIsValid} />
        {/* <Details /> */}
      </View>
    </View>
  );
};

export default EmailPassword;
