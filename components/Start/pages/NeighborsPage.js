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
import _Header from "../elements/_Header";
import _Button from "../elements/_Button";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);
const auth = getAuth();

const NeighborsPage = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  return (
    <View style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={client}>
          {!selectedChannel ? (
            <ChannelList
              filters={{ members: { $in: [auth.currentUser.uid] } }}
              onSelect={(channel) => {
                console.log(selectedChannel);
                setSelectedChannel(channel);
              }}
            />
          ) : (
            <Channel channel={selectedChannel}>
              <View></View>
              <MessageList />
              <MessageInput />
            </Channel>
          )}
        </Chat>
      </OverlayProvider>
    </View>
  );
};
export default NeighborsPage;
