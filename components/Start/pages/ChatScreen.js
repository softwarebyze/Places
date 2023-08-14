import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

export const ChatScreen = () => {
  const route = useRoute();
  const { channel } = route.params;
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};
