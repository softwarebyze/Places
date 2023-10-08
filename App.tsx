import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";

import Details from "./components/elements/Details";
import HomeTabs from "./components/navigation/HomeTabs";
import CategoryPage from "./components/pages/CategoryPage";
import ChannelInfoPage from "./components/pages/ChannelInfoPage";
import InterestsPage from "./components/pages/InterestsPage";
import JoinPlacePage from "./components/pages/JoinPlacePage";
import LocationPage from "./components/pages/LocationPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import StartPage from "./components/pages/StartPage";

const Stack = createNativeStackNavigator();

const App = () => {
  const auth = getAuth();
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  console.log("auth.currentUSer", auth.currentUser);
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
            {!user ? (
              <Stack.Group>
                <Stack.Screen name="Start" component={StartPage} />
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                  <Stack.Screen name="Login" component={LoginPage} />
                  <Stack.Screen name="Signup" component={SignUpPage} />
                </Stack.Group>
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
              </Stack.Group>
            ) : (
              <Stack.Group>
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
                  <Stack.Screen
                    name="ChannelInfo"
                    component={ChannelInfoPage}
                    options={{ headerShown: true }}
                  />
                </Stack.Group>
              </Stack.Group>
            )}
          </Stack.Navigator>
        </OverlayProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
