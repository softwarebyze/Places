import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

const NeighborsChatPage = () => {
  const route = useRoute();
  const { channel } = route.params;
  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default NeighborsChatPage;
