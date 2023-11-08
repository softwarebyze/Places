import "expo-dev-client"; // https://docs.expo.dev/develop/development-builds/use-development-builds/#add-error-handling
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OverlayProvider } from "stream-chat-expo";

import Details from "./components/elements/Details";
import HomeTabs from "./components/navigation/HomeTabs";
import {
  JoinPlaceStackParamList,
  RootStackParamList,
} from "./components/navigation/types";
import CategoryPage from "./components/pages/CategoryPage";
import ChannelInfoPage from "./components/pages/ChannelInfoPage";
import InterestsPage from "./components/pages/InterestsPage";
import JoinPlacePage from "./components/pages/JoinPlacePage";
import LocationPage from "./components/pages/LocationPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignUpPage";
import StartPage from "./components/pages/StartPage";

const JoinPlaceStackNavigator =
  createNativeStackNavigator<JoinPlaceStackParamList>();
const JoinPlaceStack = () => (
  <>
    <JoinPlaceStackNavigator.Screen
      name="JoinPlace"
      component={JoinPlacePage}
      options={{ headerShown: true, headerTitle: "Join a Place" }}
    />
    <JoinPlaceStackNavigator.Screen
      name="Category"
      component={CategoryPage}
      options={{ headerShown: true }}
    />
    <JoinPlaceStackNavigator.Screen
      name="ChannelInfo"
      component={ChannelInfoPage}
      options={{ headerShown: true }}
    />
  </>
);

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <OverlayProvider>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
            headerTintColor: "rgba(28, 27, 31, 1)",
          }}
        >
          {/* Start */}
          <RootStack.Screen name="Start" component={StartPage} />
          {/* Auth Modals */}
          <RootStack.Group screenOptions={{ presentation: "modal" }}>
            <RootStack.Screen name="Login" component={LoginPage} />
            <RootStack.Screen name="Signup" component={SignUpPage} />
          </RootStack.Group>
          {/* Onboarding */}
          <RootStack.Group>
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
          </RootStack.Group>
          {/* All the 4 tabs of the main app */}
          <RootStack.Screen name="HomeTabs" component={HomeTabs} />
          {/* Join a Place flow */}
          <RootStack.Group>
            <RootStack.Screen
              name="JoinPlaceStack"
              component={JoinPlaceStack}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </OverlayProvider>
    </NavigationContainer>
  </GestureHandlerRootView>
);

export default App;
