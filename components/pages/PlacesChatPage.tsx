import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
} from "stream-chat-expo";

import { PlacesChatPageProps } from "../navigation/types";
import { StreamChat } from "stream-chat";

const PlacesChatPage = () => {
  const route = useRoute<PlacesChatPageProps["route"]>();
  const navigator = useNavigation<PlacesChatPageProps["navigation"]>();
  const { channelId } = route.params;

  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const client = StreamChat.getInstance(
        process.env.EXPO_PUBLIC_STREAM_API_KEY,
      );
      const channel = client.channel("team", channelId);
      await channel.watch();
      setChannel(channel);
    };

    fetchChannel();
  }, [channelId]);

  // log channel id
  useEffect(() => {
    if (!channel) return;
    console.log("channel id", channel.id);
  }, [channel]);

  useEffect(() => {
    if (!channel) return;
    navigator.setOptions({
      headerTitle: channel.data.name,
    });
  }, [channel]);

  if (!channel) {
    return null;
  }

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
