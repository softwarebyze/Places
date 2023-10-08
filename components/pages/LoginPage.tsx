import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";

import { db, getStreamUserToken } from "../../firebaseConfig";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import _Button from "../elements/_Button";
import _Divider from "../elements/_Divider";
import _Header from "../elements/_Header";
import _Input from "../elements/_Input";
import { validateEmail } from "../helper/validateEmail";
import { validatePassword } from "../helper/validatePassword";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];

const { EXPO_PUBLIC_STREAM_API_KEY } = process.env;
const client = StreamChat.getInstance(EXPO_PUBLIC_STREAM_API_KEY);

const LoginPage = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("zack@test.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  const canContinue = emailIsValid && passwordIsValid;

  const signIn = async () => {
    const auth = getAuth();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (!user) {
        setLoading(false);
        return;
      }
      return user;
    } catch (error) {
      console.log("error detected!");
      if (error.code === "auth/wrong-password") {
        setError(terms["incorrect_password"]);
      } else if (error.code === "auth/too-many-requests") {
        setError(terms["too_many_attempts_try_again_later"]);
      } else if (error.code === "auth/user-not-found") {
        setError(terms["user_not_found"]);
      } else if (error.code === "auth/network-request-failed") {
        setError(terms["no_internet"]);
      } else {
        throw new Error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserData = async () => {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error("No user ID found!");

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
    const user = await signIn();
    if (!user) return;
    const userData = await getUserData();
    if (!userData?.details_completed) return navigator.replace("Details");
    if (!userData?.location && !userData?.cities.length)
      return navigator.replace("ChooseLocation");
    if (!userData?.interests)
      return navigator.replace("ChooseInterests", {
        location: userData.location,
      });
    if (!client?.user) {
      const auth = getAuth();
      const userId = auth?.currentUser?.uid;
      const tokenResponse = await getStreamUserToken();
      const token = tokenResponse.data.toString();
      if (!token) return;
      await client.connectUser(
        { id: userId, name: `${userData.first_name} ${userData.last_name}` },
        token,
      );
    }
    setLoading(false);
    return navigator.replace("HomeTabs");
  };

  return (
    <SafeAreaView style={STYLES.page}>
      <_Header
        text={terms["0016"]}
        action={() => navigator.navigate("Start")}
      />
      <_Input
        labelText={terms["email"]}
        subtextText={terms["0014"]}
        onChangeText={setEmail}
        value={email}
        isValid={emailIsValid}
      />
      <_Input
        secureTextEntry
        labelText={terms["password"]}
        subtextText={terms["0015"]}
        onChangeText={setPassword}
        isValid={passwordIsValid}
        value={password}
      />

      {error.length ? (
        <Text style={{ color: Colors.error_100 }}>{error}</Text>
      ) : null}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <_Button
            style={{ marginTop: 30 }}
            text={terms["0008"]}
            action={handleSignInFlow}
            disabled={!canContinue}
          />
          <_Divider text="or" color="gray1_100" />
          <_Button
            text={terms["0011"]}
            action={async () => {
              navigator.replace("HomeTabs");
            }}
            style={{ marginBottom: 20 }}
          />
          <_Button
            type="secondary"
            text={terms["0012"]}
            action={() => navigator.replace("Details")}
          />
          <Text
            style={STYLES.textButton}
            onPress={() => navigator.replace("Signup")}
          >
            {terms["0013"]}
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

export default LoginPage;
