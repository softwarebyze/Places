import React from "react";
import { useRoute } from "@react-navigation/native";
import { Channel, Thread } from "stream-chat-expo";

const ThreadsPage = () => {
  const route = useRoute();
  const { channel, thread } = route.params;
  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
};

export default ThreadsPage;
