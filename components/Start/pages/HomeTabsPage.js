import HomePage from "./HomePage";
import NeighborsPage from "./NeighborsPage";
import MapsPage from "./MapsPage";
import ProfilePage from "./ProfilePage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OverlayProvider } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";

import Colors from "../../../settings/Colors";
import { Foundation } from "@expo/vector-icons";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NeighborChat } from "./NeighborChatPage";
import { channel } from "expo-updates";

const Tab = createBottomTabNavigator();
const NeighborsStack = createNativeStackNavigator();
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const NeighborsStackScreen = () => (
  <OverlayProvider>
    <Chat client={client}>
      <NeighborsStack.Navigator>
        <NeighborsStack.Screen
          name="Neighbors"
          component={NeighborsPage}
          options={{
            headerShown: false,
          }}
        />
        <NeighborsStack.Screen
          name="Channel"
          component={NeighborChat}
          options={{
            title: null, // to be changed to chat name
          }}
        />
      </NeighborsStack.Navigator>
    </Chat>
  </OverlayProvider>
);

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
      text={"Home"}
      component={HomePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Foundation name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Neighbors"
      component={NeighborsStackScreen}
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
    {/* <Stack.Screen
        name="MessageChannel"
        component={NeighborsPage}
        // options={{
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons
        //       name="account-group-outline"
        //       size={size}
        //       color={color}
        //     />
        //   ),
        // }}
      /> */}
    {/* </Tab.Group> */}
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
