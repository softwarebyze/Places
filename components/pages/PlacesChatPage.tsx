import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Channel, MessageList, MessageInput } from "stream-chat-expo";

import { PlacesChatPageProps } from "../navigation/types";

const PlacesChatPage = () => {
  const route = useRoute<PlacesChatPageProps["route"]>();
  const navigator = useNavigation<PlacesChatPageProps["navigation"]>();
  const { channel } = route.params;

  useEffect(
    () =>
      navigator.setOptions({
        title: channel?.data?.name,
      }),
    [channel],
  );

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

export default PlacesChatPage;
