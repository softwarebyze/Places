import "expo-dev-client"; // https://docs.expo.dev/develop/development-builds/use-development-builds/#add-error-handling
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useContext, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";

import Details from "./components/elements/Details";
import HomeTabs from "./components/navigation/HomeTabs";
import { RootStackParamList } from "./components/navigation/types";
import InterestsPage from "./components/pages/InterestsPage";
import LocationPage from "./components/pages/LocationPage";
import LoginPage from "./components/pages/SignIn/LoginPage";
import SignUpPage from "./components/pages/SignIn/SignUpPage";
import StartPage from "./components/pages/Start/StartPage";

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AppContext = createContext<{ user: FirebaseAuthTypes.User | null }>({
  user: null,
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

const App = () => {
  const [user, setUser] = useState(() => auth().currentUser);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  useEffect(() => console.log(user), [user]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <OverlayProvider>
          <AppContext.Provider value={{ user }}>
            <RootStack.Navigator
              screenOptions={{
                headerShown: false,
                headerTintColor: "rgba(28, 27, 31, 1)",
              }}
            >
              {user ? (
                <RootStack.Screen name="HomeTabs" component={HomeTabs} />
              ) : (
                <>
                  {/* Start */}
                  <RootStack.Screen name="Start" component={StartPage} />
                  {/* // Auth Modals */}
                  <RootStack.Group screenOptions={{ presentation: "modal" }}>
                    <RootStack.Screen name="Login" component={LoginPage} />
                    <RootStack.Screen name="Signup" component={SignUpPage} />
                  </RootStack.Group>
                </>
              )}
              {/* Onboarding */}
              {/* <RootStack.Group>
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
              </RootStack.Group> */}
              {/* All the 4 tabs of the main app */}
            </RootStack.Navigator>
          </AppContext.Provider>
        </OverlayProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
