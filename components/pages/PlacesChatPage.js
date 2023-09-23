import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
} from "stream-chat-expo";

const PlacesChatPage = () => {
  const route = useRoute();
  const navigator = useNavigation();
  const { channel } = route.params;
  return (
    <OverlayProvider>
      <Channel channel={channel}>
        <MessageList
          onThreadSelect={(thread) => {
            navigator.navigate("Thread", { channel, thread });
          }}
        />
        <MessageInput />
      </Channel>
    </OverlayProvider>
  );
};

export default PlacesChatPage;
