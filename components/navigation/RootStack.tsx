import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Details from "../elements/Details";
import HomeTabs from "../navigation/HomeTabs";
import { RootStackParamList } from "../navigation/types";
import InterestsPage from "../pages/InterestsPage";
import LocationPage from "../pages/LocationPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import StartPage from "../pages/StartPage";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
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
  </Stack.Navigator>
);

export default RootStack;
