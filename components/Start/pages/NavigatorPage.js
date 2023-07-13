import { View } from "react-native";
import { useState } from "react";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
terms = TERMS["English"];
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import StartPage from "./StartPage";



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
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0e1529" },
      }}
      sceneContainerStyle={{ backgroundColor: "#0e1529" }}
      >

<Tab.Screen
          name="Home"
          action={() => props.setPageScreenState('NavigatorPage')}
          component={StartPage}
          options={{
            tabBarShowLabel: false,
         
          }}
        />
        <Tab.Screen
          name="Neighbors"
          component={StartPage}
          options={{
            tabBarShowLabel: false,
          
          }}
        />
        <Tab.Screen
          name="Maps"
          component={StartPage}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
          options={{
            tabBarShowLabel: false,
            
          }}
        />
    <Tab.Screen
          name="Profile"
          component={StartPage}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
          options={{
            tabBarShowLabel: false,
          
          }}
        />





      </Tab.Navigator>
    </View>
  );
};