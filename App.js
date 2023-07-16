import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./components/Start/pages/LoginPage";
import StartPage from "./components/Start/pages/StartPage";
import SignUpPage from "./components/Start/pages/SignUpPage";
import LocationPage from "./components/Start/pages/LocationPage";
import InterestsPage from "./components/Start/pages/InterestsPage";
import HomePage from "./components/Start/pages/HomePage";
import Details from "./components/Start/elements/Details";
import JoinPlacePage from "./components/Start/pages/JoinPlacePage";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={loggedIn ? "Home" : "Start"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={StartPage} />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignUpPage} />
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
            options={{ headerShown: true, headerTitle: "Choose a Location" }}
          />
          <Stack.Screen
            name="ChooseInterests"
            component={InterestsPage}
            options={{ headerShown: true, headerTitle: "Interests" }}
          />
        </Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="JoinPlace"
          component={JoinPlacePage}
          options={{ headerShown: true, headerTitle: "Join a Place" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
