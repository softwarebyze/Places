import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";

import { PlacesChatPageProps } from "../navigation/types";

const PlacesChatPage = () => {
  const navigator = useNavigation<PlacesChatPageProps["navigation"]>();
  const { channel } = useChatContext();

  useLayoutEffect(() => {
    navigator.setOptions({
      title: channel?.data?.name,
    });
  }, []);

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
