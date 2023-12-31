import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

const NeighborsChatPage = () => {
  const route = useRoute();
  const navigator = useNavigation();
  const { channel } = route.params;
  return (
    <Channel channel={channel}>
      <MessageList
        onThreadSelect={(thread) => {
          navigator.navigate("Thread", { channel, thread });
        }}
      />
      <MessageInput />
    </Channel>
  );
};

export default NeighborsChatPage;
