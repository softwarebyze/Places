import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeTabs from "./HomeTabs";
import { RootStackParamList } from "./types";
import { useUserData } from "../../firebase/hooks/useUserData";
import { useAuth } from "../contexts/AuthContext";
import Details from "../elements/Details";
import InterestsPage from "../pages/InterestsPage";
import LocationPage from "../pages/LocationPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import StartPage from "../pages/StartPage";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { data: userData } = useUserData();
  const { user } = useAuth();

  console.log("userData :", userData);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "rgba(28, 27, 31, 1)",
      }}
    >
      {!user ? (
        <>
          <RootStack.Screen name="Start" component={StartPage} />
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen name="Login" component={LoginPage} />
            <RootStack.Screen name="Signup" component={SignUpPage} />
          </RootStack.Group>
        </>
      ) : (
        <>
          {!userData?.details_completed && (
            <RootStack.Screen
              name="Details"
              component={Details}
              options={{ headerShown: true }}
            />
          )}
          {!userData?.cities?.[0] && (
            <RootStack.Screen
              name="ChooseLocation"
              component={LocationPage}
              options={{
                headerShown: true,
                headerTitle: "Choose a Location",
              }}
            />
          )}
          {!userData?.interests?.[0] && (
            <RootStack.Screen
              name="ChooseInterests"
              component={InterestsPage}
              options={{ headerShown: true, headerTitle: "Interests" }}
            />
          )}
          <RootStack.Screen name="HomeTabs" component={HomeTabs} />
        </>
      )}
    </RootStack.Navigator>
  );
};
