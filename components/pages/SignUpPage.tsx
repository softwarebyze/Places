import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TERMS from "../../settings/Terms";
import { ErrorModal } from "../elements/ErrorModal";
import _Button from "../elements/_Button";
import _Divider from "../elements/_Divider";
import _Header from "../elements/_Header";
import _Input from "../elements/_Input";
import { validateEmail } from "../helper/validateEmail";
import { validatePassword } from "../helper/validatePassword";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const passwordsMatch =
    passwordTextState.length && passwordTextState === confirmPasswordTextState;
  const emailIsValid = validateEmail(emailTextState);
  const passwordIsValid = validatePassword(passwordTextState);
  const canContinue = emailIsValid && passwordIsValid && passwordsMatch;

  const handleSignUp = async () => {
    setLoading(true);

    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        emailTextState,
        passwordTextState,
      );
      if (user) {
        setLoading(false);
        navigator.replace("Details");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError({
          title: "Account already made",
          message:
            "Looks like you already have a Places account, please log in to continue",
        });
      } else if (error.code === "auth/network-request-failed") {
        setError({
          title: "No connection",
          message: terms["no_internet"],
        });
      } else {
        throw new Error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={STYLES.page}>
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
        secureTextEntry
        labelText={terms["0007"]}
        subtextText={terms["your_password_must_be_at_least_6_characters"]}
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
        secureTextEntry
        labelText="Confirm Password"
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <_Button
            style={{ marginTop: 30 }}
            // continue ->
            // if firebase has your first name -> "This email is already in use."
            // else -> Details
            text={terms["0008"]}
            action={handleSignUp}
            disabled={!canContinue}
          />
          <_Divider text="or" color="gray1_100" />
          <_Button
            text={terms["0011"]}
            action={() => navigator.replace("HomeTabs")}
            style={{ marginBottom: 20 }}
          />
          <_Button
            type="secondary"
            text={terms["0012"]}
            action={() => alert("Facebook Not Yet Implemented")}
          />
          <Text
            style={STYLES.textButton}
            onPress={() => navigator.replace("Login")}
          >
            {terms["already_have_an_account"]}
          </Text>
        </>
      )}

      <ErrorModal
        {...error}
        visible={error?.message?.length > 0}
        onClose={() => setError(null)}
      />
    </SafeAreaView>
  );
};

export default SignUpPage;
