import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./components/Start/pages/LoginPage";
import StartPage from "./components/Start/pages/StartPage";
import SignUpPage from "./components/Start/pages/SignUpPage";
import LocationPage from "./components/Start/pages/LocationPage";
import InterestsPage from "./components/Start/pages/InterestsPage";
import HomePage from "./components/Start/pages/HomePage";
import Details from "./components/Start/pages/Details";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
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
          <Stack.Screen name="ChooseLocation" component={LocationPage} />
          <Stack.Screen name="ChooseInterests" component={InterestsPage} />
        </Stack.Group>
        <Stack.Screen name="Home" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
