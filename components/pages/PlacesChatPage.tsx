import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
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

  useEffect(() => {
    if (!channel) return;
    navigator.setOptions({
      headerTitle: channel.data.name,
    });
  }, [channel]);

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
