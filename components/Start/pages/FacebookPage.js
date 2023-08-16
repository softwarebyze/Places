import { View, Text } from "react-native";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import _Input from "../elements/_Input";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const terms = TERMS["English"];

const signIn = async (email_or_phone, password) => {
  const auth = getAuth();
  console.log({ auth });
  const res = await signInWithEmailAndPassword(auth, email_or_phone, password);
  console.log("res", res);
  console.log("auth.currentUser", auth.currentUser);

  const userId = auth.currentUser.uid;
  console.log("auth.currentUser.uid", userId);
};
const FacebookPage = () => {
  const navigator = useNavigation();
  return (
    <View>
      <Text style={STYLES.welcomeText}>{terms["0035"]}</Text>
      <Text style={STYLES.sloganText}>{terms["0036"]}</Text>
      {/* secureTextEntry={true}
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
        } */}
      <_Input
        labelText={"Email or Phone: "}
        subtextText={terms["0014"]}
        style={STYLES.signUpInput}
        onFocus={() => setPasswordFocusState(true)}
        onBlur={() => setPasswordFocusState(false)}
        onChangeText={(input) => setPasswordTextState(input)}
        borderColor={
          emailTextState && !emaildIsValid
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
        labelText={"Password: "}
        subtextText={terms["your_password_must_be_at_least_6_characters"]}
        style={STYLES.signUpInput}
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

      <_Button
        text={terms["0016"]}
        action={async () => {
          await signIn(emailTextState, passwordTextState);
          navigator.replace("Details");
        }}
        color={canContinue ? "primary1_100" : "primary1_030"}
        borderColor={canContinue ? "primary1_100" : "primary1_030"}
        textColor="white_100"
        disabled={!canContinue}
      />
      <Text style={STYLES.sloganText}>forgot account?</Text>

      <_Button
        text={terms["0017"]}
        action={() => navigator.navigate("Signup")}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={false}
      />
    </View>
  );
};

export default FacebookPage;
