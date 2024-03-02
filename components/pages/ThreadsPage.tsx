import { useRoute } from "@react-navigation/native";
import React from "react";
import { Channel, Thread } from "stream-chat-expo";

import { ThreadsPageProps } from "../navigation/types";

const ThreadsPage = () => {
  const route = useRoute<ThreadsPageProps["route"]>();
  const navigator = useNavigation<PlacesChatPageProps["navigation"]>();
  const { channel, thread } = route.params;

  navigator.setOptions({ title: channel.data.name });

  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
};

export default ThreadsPage;
