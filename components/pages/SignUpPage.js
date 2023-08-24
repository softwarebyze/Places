import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StreamChat } from "stream-chat";

import TERMS from "../../settings/Terms";
import _Button from "../elements/_Button";
import _Divider from "../elements/_Divider";
import _Header from "../elements/_Header";
import _Input from "../elements/_Input";
import STYLES from "../styles/Styles";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [emailFocusState, setEmailFocusState] = useState(false);
  const [emailTextState, setEmailTextState] = useState("");
  const [passwordFocusState, setPasswordFocusState] = useState(false);
  const [passwordTextState, setPasswordTextState] = useState("");
  const [confirmPasswordFocusState, setConfirmPasswordFocusState] =
    useState(false);
  const [confirmPasswordTextState, setConfirmPasswordTextState] = useState("");
  const [loading, setLoading] = useState(false);

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
        const userId = auth.currentUser.uid;
        const res = await fetch(`https://auth-token.onrender.com/${userId}`);
        const { token } = await res.json();
        const client = StreamChat.getInstance(
          process.env.EXPO_PUBLIC_STREAM_API_KEY,
        );
        await client.connectUser({ id: userId }, token);
        setLoading(false);
        navigator.replace("Details");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setModalVisible(true);
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

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textStyle_2}>Account already made.</Text>
              <Text style={styles.modalText}>
                Looks like you already have a Places account, please log in to
                continue
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle_2}>Account already made</Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle_2: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SignUpPage;
