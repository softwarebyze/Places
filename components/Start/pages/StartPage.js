import { View, StyleSheet, Text } from "react-native";
import _Button from "../elements/_Button";
import _Logo from "../elements/_Logo";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";

//import all the components we are going to use
import { SafeAreaView, Button } from "react-native";

import Spinner from "react-native-loading-spinner-overlay";

import React, { useState, Component } from "react";

import { Platform } from "react-native";

const terms = TERMS["English"];

const StartPage = () => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const navigator = useNavigation();
  return (
    <View style={[STYLES.page, STYLES.spaceEvenly]}>
      <_Logo style={[STYLES.fullLogo, STYLES.startFullLogo]} />

      <View style={styles.container}>
        <Spinner
          size="small"
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
          textContent={"Loading..."}
          //Text style of the Spinner Text
          textStyle={styles.spinnerTextStyle}
        />

        <Button title="Start Loading" onPress={startLoading}></Button>
      </View>

      <View>
        <Text style={STYLES.welcomeText}>{terms["0001"]}</Text>
        <Text style={STYLES.sloganText}>{terms["0002"]}</Text>
      </View>

      <_Button
        text={terms["0003"]}
        action={() => navigator.navigate("Signup")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
        style={STYLES.startButton}
      />
      <_Button
        text={terms["0004"]}
        action={() => navigator.navigate("Login")}
        buttonColor="white_100"
        buttonBorderColor="black_100"
        textColor="primary1_100"
        style={STYLES.startButton}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default StartPage;
