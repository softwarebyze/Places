import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./components/pages/LoginPage";
import StartPage from "./components/pages/StartPage";
import SignUpPage from "./components/pages/SignUpPage";
import LocationPage from "./components/pages/LocationPage";
import InterestsPage from "./components/pages/InterestsPage";
import Details from "./components/elements/Details";
import JoinPlacePage from "./components/pages/JoinPlacePage";
import CategoryPage from "./components/pages/CategoryPage";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeTabs from "./components/navigation/HomeTabs";
import { OverlayProvider } from "stream-chat-expo";
import ChannelInfoPage from "./components/pages/ChannelInfoPage";

const Stack = createNativeStackNavigator();

const App = () => {
  const [loggedIn] = useState(false);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <OverlayProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              headerTintColor: "rgba(28, 27, 31, 1)",
            }}
          >
            {/* Start */}
            <Stack.Screen name="Start" component={StartPage} />
            {/* Auth Modals */}
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Signup" component={SignUpPage} />
            </Stack.Group>
            {/* Onboarding */}
            <Stack.Group>
              <Stack.Screen
                name="Details"
                component={Details}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="ChooseLocation"
                component={LocationPage}
                options={{
                  headerShown: true,
                  headerTitle: "Choose a Location",
                }}
              />
              <Stack.Screen
                name="ChooseInterests"
                component={InterestsPage}
                options={{ headerShown: true, headerTitle: "Interests" }}
              />
            </Stack.Group>
            {/* All the 4 tabs of the main app */}
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            {/* Join a Place flow */}
            <Stack.Group>
              <Stack.Screen
                name="JoinPlace"
                component={JoinPlacePage}
                options={{ headerShown: true, headerTitle: "Join a Place" }}
              />
              <Stack.Screen
                name="Category"
                component={CategoryPage}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="ChannelInfo"
                component={ChannelInfoPage}
                options={{ headerShown: true }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </OverlayProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
