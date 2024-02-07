import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { StreamChat } from "stream-chat";
import { Chat, DefaultStreamChatGenerics } from "stream-chat-expo";

import { HomeStackParamList } from "./types";
import Colors from "../../settings/Colors";
import CategoryPage from "../pages/CategoryPage";
import ChannelInfoPage from "../pages/ChannelInfoPage";
import HomePage from "../pages/HomePage";
import JoinPlacePage from "../pages/JoinPlacePage";
import PlacesChatPage from "../pages/PlacesChatPage";
import ThreadsPage from "../pages/ThreadsPage";

const Stack = createNativeStackNavigator<HomeStackParamList>();

const client = StreamChat.getInstance<DefaultStreamChatGenerics>(
  process.env.EXPO_PUBLIC_STREAM_API_KEY,
);

const Header = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <View style={{ alignItems: "center", gap: 2, marginVertical: 2 }}>
      <Text style={{ fontSize: 16 }}>{heading}</Text>
      <Text style={{ fontSize: 12, color: Colors.dark_grey }}>
        {subheading}
      </Text>
    </View>
  );
};

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
        options={({ route }) => ({
          headerTitle: () => (
            <Header
              heading={`${route.params.channel.data.category} / ${route.params.channel.data.interest}`}
              subheading={`${route.params.channel.data.location} (${route.params.channel.data.member_count} members)`}
            />
          ),
        })}
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
