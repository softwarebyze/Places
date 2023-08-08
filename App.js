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
import CategoryPage from "./components/Start/pages/CategoryPage";
import NeighborsPage from "./components/Start/pages/NeighborsPage";
import MapsPage from "./components/Start/pages/MapsPage";
import ProfilePage from "./components/Start/pages/ProfilePage";
import FacebookPage from "./components/Start/pages/FacebookPage";
import { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "./settings/Colors";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeTabs from "./components/Start/pages/HomeTabsPage";

const Stack = createNativeStackNavigator();

const App = () => {
  const [loggedIn] = useState(false);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
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
              options={{ headerShown: true, headerTitle: "Choose a Location" }}
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
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
