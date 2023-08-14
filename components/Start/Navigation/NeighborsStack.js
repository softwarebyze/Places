import { ChatScreen } from "../pages/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";
import NeighborsPage from "../pages/NeighborsPage";

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
        name="Channel"
        component={ChatScreen}
        options={{
          title: null, // to be changed to chat name
        }}
      />
    </Stack.Navigator>
  </Chat>
);
export default NeighborsStack;
