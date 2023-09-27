import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";

import NeighborsChatPage from "@/pages/NeighborsChatPage";
import NeighborsPage from "@/pages/NeighborsPage";
import ThreadsPage from "@/pages/ThreadsPage";

const Stack = createNativeStackNavigator();
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const NeighborsStack = () => (
  <Chat client={client}>
    <Stack.Navigator>
      <Stack.Screen
        name="NeighborsList"
        component={NeighborsPage}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NeighborsChat"
        component={NeighborsChatPage}
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
export default NeighborsStack;
