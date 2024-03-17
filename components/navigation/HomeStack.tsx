import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useUserData } from "../../firebase/hooks/useUserData";
import CategoryPage from "../pages/CategoryPage";
import ChannelInfoPage from "../pages/ChannelInfoPage";
import HomePage from "../pages/HomePage";
import InterestsPage from "../pages/InterestsPage";
import JoinPlacePage from "../pages/JoinPlacePage";
import PlacesChatPage from "../pages/PlacesChatPage";
import ThreadsPage from "../pages/ThreadsPage";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const { data: userData } = useUserData();
  return (
    <Stack.Navigator>
      {!userData?.interests?.[0] && (
        <Stack.Screen
          name="ChooseInterests"
          component={InterestsPage}
          options={{ headerShown: true, headerTitle: "Interests" }}
        />
      )}
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      {/* Join a Place flow */}
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
        options={{ headerShown: true, headerTitle: "Chat Info" }}
      />
      <Stack.Screen
        name="PlacesChat"
        component={PlacesChatPage}
        options={{
          title: null, // to be changed to chat name
        }}
      />
      <Stack.Screen
        name="Thread"
        component={ThreadsPage}
        options={{
          title: null, // to be changed to chat name
        }}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
