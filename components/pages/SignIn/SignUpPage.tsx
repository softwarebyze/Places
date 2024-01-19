import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text } from "react-native";
import { StreamChat } from "stream-chat";

import { Header } from "./Header";
import { signInWithGoogle } from "../../../firebase/signInWithGoogle";
import { getUserData } from "../../../firebase/users";
import { getStreamUserToken } from "../../../firebaseConfig";
import TERMS from "../../../settings/Terms";
import { PButton } from "../../elements/Button";
import { ErrorModal } from "../../elements/ErrorModal";
import { Input } from "../../elements/Input";
import { ModalPage } from "../../elements/Page";
import _Divider from "../../elements/_Divider";
import { validateEmail } from "../../helper/validateEmail";
import { validatePassword } from "../../helper/validatePassword";
import { SignupPageProps } from "../../navigation/types";
import STYLES from "../../styles/Styles";

const terms = TERMS["English"];

const { EXPO_PUBLIC_STREAM_API_KEY } = process.env;
const client = StreamChat.getInstance(EXPO_PUBLIC_STREAM_API_KEY);

const SignUpPage = () => {
  const navigator = useNavigation<SignupPageProps["navigation"]>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const passwordsMatch = password.length && password === confirmPassword;
  const emailIsValid = validateEmail(email);
  const passwordIsValid = validatePassword(password);
  const canContinue = emailIsValid && passwordIsValid && passwordsMatch;

  const signUpWithEmailAndPassword = () =>
    auth().createUserWithEmailAndPassword(email, password);

  const signUpWithGoogle = signInWithGoogle;

  const handleSignUp = async (signUpMethod: "google" | "email" = "email") => {
    setLoading(true);

    try {
      const signInHandler =
        signUpMethod === "google"
          ? signUpWithGoogle
          : signUpWithEmailAndPassword;
      const user = await signInHandler();
      console.log("user: ", JSON.stringify(user));
      if (!user) return setLoading(false);
      const userData = await getUserData();

      if (!userData?.details_completed) {
        setLoading(false);
        return navigator.replace("Details", {
          firstName: user?.additionalUserInfo.profile?.given_name || "",
          lastName: user?.additionalUserInfo.profile?.family_name || "",
        });
      }
      if (!userData?.location && !userData?.cities.length)
        return navigator.replace("ChooseLocation");
      if (!userData?.interests)
        return navigator.replace("ChooseInterests", {
          location: userData.location,
        });
      if (!client?.user) {
        const userId = auth()?.currentUser?.uid;
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

  const handleSignUpWithGoogle = () => handleSignUp("google");

  return (
    <ModalPage>
      <Header text={terms["0005"]} action={() => navigator.navigate("Start")} />
      <Input
        labelText={terms["email"]}
        subtextText={terms["0014"]}
        onChangeText={setEmail}
        value={email}
        isValid={emailIsValid}
      />
      <Input
        secureTextEntry
        labelText={terms["password"]}
        subtextText={terms["your_password_must_be_at_least_6_characters"]}
        onChangeText={setPassword}
        value={password}
        isValid={passwordIsValid}
      />
      <Input
        secureTextEntry
        labelText="Confirm Password"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        isValid={passwordsMatch}
        subtextText={terms.passwords_must_match}
      />

      <PButton
        style={{ marginTop: 30 }}
        // continue ->
        // if firebase has your first name -> "This email is already in use."
        // else -> Details
        text={terms["0008"]}
        action={handleSignUp}
        disabled={!canContinue}
        loading={loading}
      />
      <_Divider text="or" color="gray1_100" />
      <PButton
        text={terms["0011"]}
        action={handleSignUpWithGoogle}
        style={{ marginBottom: 20 }}
      />
      <PButton
        type="secondary"
        text={terms["0012"]}
        action={() => alert("Facebook Not Yet Implemented")}
      />
      <Text
        style={[STYLES.textButton, { alignSelf: "center" }]}
        onPress={() => navigator.navigate("Login")}
      >
        {terms["already_have_an_account"]}
      </Text>

      <ErrorModal
        {...error}
        visible={error?.message?.length > 0}
        onClose={() => setError(null)}
      />
    </ModalPage>
  );
};

export default SignUpPage;
