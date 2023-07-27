import { Text, View } from "react-native";
import _Header from "../elements/_Header";
import TERMS from "../../../settings/Terms";
import _Input from "../elements/_Input";
import _Divider from "../elements/_Divider";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import _Button from "../elements/_Button";
import STYLES from "../styles/Styles";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const popupPage = () => {
  return <View style={STYLES.page}></View>;
};
export default popupPage;
