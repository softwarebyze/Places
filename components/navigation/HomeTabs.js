import { Foundation, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStack from "./HomeStack";
import NeighborsStack from "./NeighborsStack";
import Colors from "../../settings/Colors";
import MapsPage from "../pages/MapsPage";
import ProfilePage from "../pages/ProfilePage";

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: {
        fontSize: 12,
      },
      headerShown: true,
      tabBarStyle: {
        backgroundColor: Colors.white_100,
        color: Colors.primary1_100,
        paddingVertical: 8,
      },
      tabBarIconStyle: {
        tintColor: Colors.orange,
        color: Colors.orange,
      },
      tabBarActiveTintColor: Colors.orange,
      tabBarInactiveTintColor: Colors.dark_grey,
    }}
    sceneContainerStyle={{ backgroundColor: "white_100" }}
  >
    <Tab.Screen
      name="Home"
      text="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Foundation name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Neighbors"
      component={NeighborsStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-group-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Maps"
      component={MapsPage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="map-outline"
            size={size}
            color={color}
          />
        ),
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
);

export default HomeTabs;
