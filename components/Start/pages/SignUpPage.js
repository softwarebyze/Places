import { Text, View } from "react-native";
import _Header from "../elements/_Header";
import TERMS from "../../../settings/Terms";
import _Input from "../elements/_Input";
import _Divider from "../elements/_Divider";
import { useState } from "react";

import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";
const terms = TERMS["English"];

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const SignUpPage = () => {
  const navigator = useNavigation();
  const auth = getAuth();

  const [emailFocusState, setEmailFocusState] = useState(false);
  const [emailTextState, setEmailTextState] = useState("");
  const [passwordFocusState, setPasswordFocusState] = useState(false);
  const [passwordTextState, setPasswordTextState] = useState("");
  const [confirmPasswordFocusState, setConfirmPasswordFocusState] =
    useState(false);
  const [confirmPasswordTextState, setConfirmPasswordTextState] = useState("");
  const passwordsMatch =
    passwordTextState.length && passwordTextState === confirmPasswordTextState;

  const emailIsValid = validateEmail(emailTextState);
  const passwordIsValid = validatePassword(passwordTextState);
  const canContinue = emailIsValid && passwordIsValid && passwordsMatch;

  const netInfo = useNetInfo();

  netInfo.isConnected.fetch().then((isConnected) => {
    if (!isConnected) {
      navigator.navigate("NoConnection");
    }
  });

  return (
    <View style={STYLES.page}>
      <_Header
        text={terms["0005"]}
        action={() => navigator.navigate("Start")}
      />
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
      <_Input
        secureTextEntry={true}
        labelText={"Confirm Password"}
        onFocus={() => setConfirmPasswordFocusState(true)}
        onBlur={() => setConfirmPasswordFocusState(false)}
        onChangeText={setConfirmPasswordTextState}
        borderColor={
          confirmPasswordFocusState ? "primary1_100" : "primary1_030"
        }
        subtextColor={
          emailTextState
            ? "primary1_030"
            : passwordFocusState
            ? "primary1_030"
            : "clear_000"
        }
      />
      <_Button
        // continue ->
        // if firebase has your first name -> "This email is already in use."
        // else -> Details
        text={terms["0008"]}
        action={async () => {
          await createUserWithEmailAndPassword(
            auth,
            emailTextState,
            passwordTextState,
          );
          navigator.replace("Details");
        }}
        color={canContinue ? "primary1_100" : "primary1_030"}
        borderColor={canContinue ? "primary1_100" : "primary1_030"}
        textColor="white_100"
        disabled={!canContinue}
      />
      <_Divider text="or" color="gray1_100" />
      <_Button
        text={terms["0011"]}
        action={() => navigator.replace("HomeTabs")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
        style={{ marginBottom: 20 }}
      />
      <_Button
        text={terms["0012"]}
        action={() => navigator.replace("Facebook")}
        color="white_100"
        borderColor="primary1_100"
        textColor="primary1_100"
      />
      <_Button
        text={"Already have an account?"}
        action={() => navigator.replace("Login")}
        color="white_100"
        borderColor="white_100"
        textColor="primary1_100"
        underline={true}
      />
    </View>
  );
};

export default SignUpPage;
