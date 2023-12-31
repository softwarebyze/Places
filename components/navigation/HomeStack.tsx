import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";

import HomePage from "../pages/HomePage";
import PlacesChatPage from "../pages/PlacesChatPage";
import ThreadsPage from "../pages/ThreadsPage";

const Stack = createNativeStackNavigator();
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const HomeStack = () => (
  <Chat client={client}>
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
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
  </Chat>
);
export default HomeStack;
