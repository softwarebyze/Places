import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
} from "stream-chat-expo";

import { PlacesChatPageProps } from "../navigation/types";

const PlacesChatPage = () => {
  const route = useRoute<PlacesChatPageProps["route"]>();
  const navigator = useNavigation<PlacesChatPageProps["navigation"]>();
  const { channel } = route.params;

  navigator.setOptions({ title: channel.data.name });

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
