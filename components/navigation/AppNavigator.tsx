import auth from "@react-native-firebase/auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator } from "react-native";

import HomeTabs from "./HomeTabs";
import { RootStackParamList } from "./types";
import { useAuth, useUserData } from "../../firebase/hooks/useUserData";
import Details from "../elements/Details";
import InterestsPage from "../pages/InterestsPage";
import LocationPage from "../pages/LocationPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import StartPage from "../pages/StartPage";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { data: userData, isLoading } = useUserData();
  const { user, loading } = useAuth();
  console.log("userData :", userData);
  const {
    details_completed,
    birth_date,
    first_name,
    gender,
    interests,
    last_name,
    phone,
    cities,
  } = userData || {};

  if (isLoading || loading) return <ActivityIndicator />;

  console.log("details_completed :", details_completed);
  console.log("uid: ", auth().currentUser?.uid);
  console.log(cities);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "rgba(28, 27, 31, 1)",
      }}
    >
      {user?.uid && (
        <>
          <RootStack.Screen name="Start" component={StartPage} />
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen name="Login" component={LoginPage} />
            <RootStack.Screen name="Signup" component={SignUpPage} />
          </RootStack.Group>
        </>
      )}
      {/* Onboarding */}
      <RootStack.Group>
        {!details_completed && (
          <RootStack.Screen
            name="Details"
            component={Details}
            options={{ headerShown: true }}
          />
        )}
        {!cities ||
          (!cities?.length && (
            <RootStack.Screen
              name="ChooseLocation"
              component={LocationPage}
              options={{
                headerShown: true,
                headerTitle: "Choose a Location",
              }}
            />
          ))}
        {!interests ||
          (!interests?.length && (
            <RootStack.Screen
              name="ChooseInterests"
              component={InterestsPage}
              options={{ headerShown: true, headerTitle: "Interests" }}
            />
          ))}
      </RootStack.Group>
      {/* All the 4 tabs of the main app */}
      {first_name && last_name && birth_date && (
        <RootStack.Screen name="HomeTabs" component={HomeTabs} />
      )}
    </RootStack.Navigator>
  );
};
