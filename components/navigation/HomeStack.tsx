import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StreamChat } from "stream-chat";
import { Chat, DefaultStreamChatGenerics } from "stream-chat-expo";

import CategoryPage from "../pages/CategoryPage";
import ChannelInfoPage from "../pages/ChannelInfoPage";
import HomePage from "../pages/HomePage";
import JoinPlacePage from "../pages/JoinPlacePage";
import PlacesChatPage from "../pages/PlacesChatPage";
import ThreadsPage from "../pages/ThreadsPage";

const Stack = createNativeStackNavigator();

const client = StreamChat.getInstance<DefaultStreamChatGenerics>(
  process.env.EXPO_PUBLIC_STREAM_API_KEY,
);

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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="PlacesChat"
        component={PlacesChatPage}
        // options={({ route }) => {return ({
        //   headerTitle: route.params?.channel?.data.name;
        // })}}
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
