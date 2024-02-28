import "expo-dev-client"; // https://docs.expo.dev/develop/development-builds/use-development-builds/#add-error-handling
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";

import Details from "./components/elements/Details";
import HomeTabs from "./components/navigation/HomeTabs";
import { RootStackParamList } from "./components/navigation/types";
import InterestsPage from "./components/pages/InterestsPage";
import LocationPage from "./components/pages/LocationPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import StartPage from "./components/pages/StartPage";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const prefix = Linking.createURL("/");

  const linking: LinkingOptions<object> | undefined = {
    prefixes: [prefix],
    config: {
      screens: {
        Start: "",
        Login: "login",
        Signup: "signup",
        Details: "details",
        ChooseLocation: "location",
        ChooseInterests: "interests",
        HomeTabs: {
          screens: {
            Home: {
              screens: {
                HomePage: "home",
                PlacesChat: "chat/:channelId",
                Thread: "thread",
                ChannelInfo: "info",
                JoinPlace: "join",
                Category: "category",
              },
            },
            Profile: "profile",
          },
        },
      },
    },
  };

  const url = Linking.useURL();

  useEffect(() => {
    console.log("url changed to", url);
  }, [url]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
        <OverlayProvider>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              headerTintColor: "rgba(28, 27, 31, 1)",
            }}
          >
            {/* Start */}
            <RootStack.Screen name="Start" component={StartPage} />
            {/* Auth Modals */}
            <RootStack.Group screenOptions={{ presentation: "modal" }}>
              <RootStack.Screen name="Login" component={LoginPage} />
              <RootStack.Screen name="Signup" component={SignUpPage} />
            </RootStack.Group>
            {/* Onboarding */}
            <RootStack.Group>
              <RootStack.Screen
                name="Details"
                component={Details}
                options={{ headerShown: true }}
              />
              <RootStack.Screen
                name="ChooseLocation"
                component={LocationPage}
                options={{
                  headerShown: true,
                  headerTitle: "Choose a Location",
                }}
              />
              <RootStack.Screen
                name="ChooseInterests"
                component={InterestsPage}
                options={{ headerShown: true, headerTitle: "Interests" }}
              />
            </RootStack.Group>
            {/* All the 4 tabs of the main app */}
            <RootStack.Screen name="HomeTabs" component={HomeTabs} />
          </RootStack.Navigator>
        </OverlayProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
