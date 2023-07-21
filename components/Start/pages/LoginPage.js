import { Text, View } from "react-native";
import _Header from "../elements/_Header";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Divider from "../elements/_Divider";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { StreamChat } from "stream-chat";
// import { getFunctions, httpsCallable } from "firebase/functions";

const terms = TERMS["English"];

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

const validatePassword = (password) => {
  return password.length >= 6;
};

// const { EXPO_PUBLIC_STREAM_API_KEY } = process.env;
// const client = StreamChat.getInstance(EXPO_PUBLIC_STREAM_API_KEY);

// const fetchStreamToken = async (userId) => {
//   try {
//     const response = await fetch(
//       `https://us-east1-places-e6047.cloudfunctions.net/ext-auth-chat-getStreamUserToken?userId=${userId}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json", // Set the Content-Type header to indicate JSON data
//         },
//         body: JSON.stringify({ userId }), // Send the user ID as JSON data in the request body
//       },
//     );

//     if (!response.ok) {
//       // Handle the error if the response is not ok
//       console.error("Error fetching Stream token");
//       return;
//     }

//     const data = await response.json();
//     console.log({ data });
//   } catch (error) {
//     console.error("Error fetching Stream token:", error);
//   }
// };

const signIn = async (email, password) => {
  const auth = getAuth();
  console.log({ auth });
  await signInWithEmailAndPassword(auth, email, password);
  console.log("auth.currentUser", auth.currentUser);

  const userId = auth.currentUser.uid;
  console.log("auth.currentUser.uid", userId);
  // try {
  //   const functions = getFunctions();
  //   const getStreamUserToken = httpsCallable(functions, "getStreamUserToken");
  //   const data = await getStreamUserToken({ userId });
  //   console.log(data);
  // } catch (error) {
  //   console.log("getStreamUserToken error: ", error);
  // }

  // const { token } = data;
  // console.log(token);
  // fetchStreamToken(userId);
  // client.connectUser({ id: userId }, token);
};

const LoginPage = () => {
  const navigator = useNavigation();
  const [emailFocusState, setEmailFocusState] = useState(false);
  const [emailTextState, setEmailTextState] = useState("");
  const [passwordFocusState, setPasswordFocusState] = useState(false);
  const [passwordTextState, setPasswordTextState] = useState("");

  const emailIsValid = validateEmail(emailTextState);
  const passwordIsValid = validatePassword(passwordTextState);
  const canContinue = emailIsValid && passwordIsValid;

  return (
    <View style={STYLES.page}>
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
      <_Button
        text={terms["0008"]}
        action={async () => {
          await signIn(emailTextState, passwordTextState);
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
      <Text>{JSON.stringify({ emailTextState, passwordTextState })}</Text>
    </View>
  );
};

export default LoginPage;
