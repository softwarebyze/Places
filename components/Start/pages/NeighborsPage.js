import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Channel,
  ChannelList,
  Chat,
  OverlayProvider,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

// const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);
const auth = getAuth();

const NeighborsPage = () => {
  const navigator = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [auth.currentUser.uid] },
        }}
        onSelect={(channel) => {
          navigator.navigate("Channel", { channel });
          // navigator.navigate("Neighbors", {
          //   screen: "Channel",
          //   params: { channel },
          // });
        }}
      />
    </View>
  );
};
export default NeighborsPage;
