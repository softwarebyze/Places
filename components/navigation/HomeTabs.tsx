import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./HomeStack";
import { HomeTabParamList } from "./types";
import Colors from "../../settings/Colors";
import { ChatWrapper } from "../elements/ChatWrapper";
import ProfilePage from "../pages/ProfilePage";

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = () => (
  <ChatWrapper>
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: true,
        tabBarStyle: {
          backgroundColor: Colors.white_100,
          paddingVertical: 8,
        },
        tabBarIconStyle: {
          color: Colors.orange,
        },
        tabBarActiveTintColor: Colors.orange,
        tabBarInactiveTintColor: Colors.dark_grey,
      }}
      sceneContainerStyle={{ backgroundColor: "white_100" }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  </ChatWrapper>
);

export default HomeTabs;
