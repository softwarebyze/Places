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

const Tab = createBottomTabNavigator();

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Neighbors" component={SettingsScreen} />
//       <Tab.Screen name="Maps" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={HomeScreen} />
//     </Tab.Navigator>
//   );
// }
export default NavigatorPage = (props) => {
  return (
    <View>
      <Tab.Navigator
        // style={{
        //   // position: 'absolute',

        //    height: 1000,
        //    //backgroundColor: '#ff00ff',
        //    bottom: 10,
        //     justifyContent: 'center',
        //     alignItems: 'center'
        //  }}
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, paddingBottom: 5 },
          headerShown: true,
          tabBarStyle: {
            marginBottom: Platform.OS === "ios" ? -15 : 0,
            backgroundColor: "#0e1529",
          },
        }}
        sceneContainerStyle={{ backgroundColor: "white_100" }}
      >
        <Tab.Screen
          name="Home"
          text={"Home"}
          // options={{
          //   tabBarLabel: 'Home',
          //   tabBarIcon: ({ color, size }) => (
          //     <MaterialCommunityIcons name="home" color={color} size={size} />
          //   ),
          // }}
          action={() => props.setPageScreenState("LocationPage")}
          component={StartPage}
          options={{
            tabBarShowLabel: true,
          }}
        />
        <Tab.Screen
          name="Neighbors"
          component={StartPage}
          action={() => props.setPageScreenState("LocationPage")}
          options={{
            tabBarShowLabel: true,
          }}
        />
        <Tab.Screen
          name="Maps"
          component={StartPage}
          options={{
            tabBarShowLabel: true,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={StartPage}
          options={{
            tabBarShowLabel: true,
          }}
        />
      </Tab.Navigator>

      <Text>{terms["0024"]}</Text>

      <View style={[{ width: "75%", margin: 40, backgroundColor: "red" }]}>
        <_Button
          text={terms["0027"]}
          action={() => props.setPageScreenState("JoinPlacePage")}
          color="hsla(268, 100%, 11%, 1)"
          borderColor={props.canContinue ? "primary1_100" : "primary1_030"}
          textColor="white_100"
          j
        />
      </View>
    </View>
  );
};
