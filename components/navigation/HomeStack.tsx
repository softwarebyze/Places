import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";

import { getStreamUserToken } from "../../firebaseConfig";
import ChannelInfoPage from "../pages/ChannelInfoPage";
import HomePage from "../pages/HomePage";
import PlacesChatPage from "../pages/PlacesChatPage";
import ThreadsPage from "../pages/ThreadsPage";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const [chatClient, setChatClient] = useState(null);
  const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

  useEffect(() => {
    const initChat = async () => {
      const auth = getAuth();
      const userId = auth?.currentUser?.uid;
      // open the WebSocket connection to start receiving events
      await client.connectUser({ id: userId }, async () => {
        const tokenResponse = await getStreamUserToken();
        const token = tokenResponse.data.toString();
        return token;
      });
      setChatClient(client);
    };

    initChat();

    // close the WebSocket connection when component dismounts
    return () => {
      client.disconnectUser();
    };
  }, []);

  if (!chatClient) return null;

  return (
    <Chat client={chatClient}>
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
        <Stack.Screen
          name="ChannelInfo"
          component={ChannelInfoPage}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </Chat>
  );
};
export default HomeStack;
