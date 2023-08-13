import { NeighborChat } from "../pages/NeighborChatPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";
import NeighborsPage from "../pages/NeighborsPage";

const NeighborsStack = createNativeStackNavigator();
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const NeighborsStackScreen = () => (
  <Chat client={client}>
    <NeighborsStack.Navigator>
      <NeighborsStack.Screen
        name="NeighborsList"
        component={NeighborsPage}
        options={{
          headerShown: false,
        }}
      />
      <NeighborsStack.Screen
        name="Channel"
        component={NeighborChat}
        options={{
          title: null, // to be changed to chat name
        }}
      />
    </NeighborsStack.Navigator>
  </Chat>
);
export default NeighborsStackScreen;
