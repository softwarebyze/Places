import { ActivityIndicator } from "react-native";
import _Header from "../elements/_Header";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Divider from "../elements/_Divider";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { StreamChat } from "stream-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const terms = TERMS["English"];

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const { EXPO_PUBLIC_STREAM_API_KEY } = process.env;
const client = StreamChat.getInstance(EXPO_PUBLIC_STREAM_API_KEY);

const signIn = async (email, password) => {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
  const userId = auth.currentUser.uid;
  const res = await fetch(`https://auth-token.onrender.com/${userId}`);
  const { token } = await res.json();
  await client.connectUser({ id: userId }, token);
};

const LoginPage = () => {
  const navigator = useNavigation();
  const [emailFocusState, setEmailFocusState] = useState(false);
  const [emailTextState, setEmailTextState] = useState("");
  const [passwordFocusState, setPasswordFocusState] = useState(false);
  const [passwordTextState, setPasswordTextState] = useState("");
  const [loading, setLoading] = useState(false);

  const emailIsValid = validateEmail(emailTextState);
  const passwordIsValid = validatePassword(passwordTextState);
  const canContinue = emailIsValid && passwordIsValid;

  const getUserData = async () => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log("No data for user!");
      return null;
    }
  };

  const handleSignInFlow = async () => {
    setLoading(true);
    await signIn(emailTextState, passwordTextState);
    const userData = await getUserData();
    setLoading(false);
    if (!userData?.details_completed) return navigator.replace("Details");
    if (!userData?.location) return navigator.replace("ChooseLocation");
    if (!userData?.interests) return navigator.replace("ChooseInterests");
    return navigator.replace("HomeTabs");
  };

  return (
    <SafeAreaView style={STYLES.page}>
      <_Header
        text={terms["0016"]}
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
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <_Button
            text={terms["0008"]}
            action={handleSignInFlow}
            color={canContinue ? "primary1_100" : "primary1_030"}
            borderColor={canContinue ? "primary1_100" : "primary1_030"}
            textColor="white_100"
            disabled={!canContinue}
          />
          <_Divider text="or" color="gray1_100" />
          <_Button
            text={terms["0011"]}
            action={async () => {
              navigator.replace("HomeTabs");
            }}
            color="primary1_100"
            borderColor="primary1_100"
            textColor="white_100"
            style={{ marginBottom: 20 }}
          />
          <_Button
            text={terms["0012"]}
            action={() => navigator.replace("Details")}
            color="white_100"
            borderColor="primary1_100"
            textColor="primary1_100"
          />
          <_Button
            text={terms["0013"]}
            action={() => navigator.replace("Signup")}
            color="white_100"
            borderColor="white_100"
            textColor="primary1_100"
            underline={true}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginPage;
