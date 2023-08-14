import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./components/Start/pages/LoginPage";
import StartPage from "./components/Start/pages/StartPage";
import SignUpPage from "./components/Start/pages/SignUpPage";
import LocationPage from "./components/Start/pages/LocationPage";
import InterestsPage from "./components/Start/pages/InterestsPage";
import Details from "./components/Start/elements/Details";
import JoinPlacePage from "./components/Start/pages/JoinPlacePage";
import CategoryPage from "./components/Start/pages/CategoryPage";
import FacebookPage from "./components/Start/pages/FacebookPage";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeTabs from "./components/Start/navigation/HomeTabs";
import { OverlayProvider } from "stream-chat-expo";

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
            <Stack.Screen name="Start" component={StartPage} />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="Login" component={LoginPage} />
              <Stack.Screen name="Signup" component={SignUpPage} />
              <Stack.Screen name="Facebook" component={FacebookPage} />
            </Stack.Group>
            <Stack.Screen
              name="Details"
              component={Details}
              options={{ headerShown: true }}
            />
            <Stack.Group>
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
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
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
            </Stack.Group>
          </Stack.Navigator>
        </OverlayProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
