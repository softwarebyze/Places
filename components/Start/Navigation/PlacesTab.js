import { ChatScreen } from "../pages/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-expo";
import HomePage from "../pages/HomePage";

const HomeStack = createNativeStackNavigator();
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const HomeStackScreen = () => (
  <Chat client={client}>
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Channel"
        component={ChatScreen}
        options={{
          title: null, // to be changed to chat name
        }}
      />
    </HomeStack.Navigator>
  </Chat>
);
export default HomeStackScreen;
