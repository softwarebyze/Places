import { Button, View } from "react-native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
terms = TERMS["English"];
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StartPage from "./StartPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignUpPage from "./SignUpPage";

export default JoinPlacePage = (props) => {
  return (
    <View>
      <_Button
        text={terms["0019"]}
        action={() => props.setPageScreenState("NavigatorPage")}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />

      <Text style={STYLES.welcomeText}>{terms["0033"]}</Text>

      <Text style={STYLES.sloganText}>{terms["0028"]}</Text>

      <_Button
        text={terms["0029"]}
        //     action={() => props.setPageScreenState('NavigatorPage')}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      <_Button
        text={terms["0030"]}
        //   action={() => props.setPageScreenState('NavigatorPage')}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      <_Button
        text={terms["0031"]}
        //       action={() => props.setPageScreenState('NavigatorPage')}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      <_Button
        text={terms["0032"]}
        //  action={() => props.setPageScreenState('NavigatorPage')}
        color="primary1_100"
        borderColor="primary1_100"
        textColor="white_100"
      />
      {/* <_Button
            text={terms['0026']}
            action={() => props.setPageScreenState('JoinPlacePage')}
            color='hsla(268, 100%, 11%, 1)'
            borderColor={props.canContinue ? 'primary1_100' : 'primary1_030'}
            textColor='white_100'j
           
         /> */}
    </View>
  );
};
