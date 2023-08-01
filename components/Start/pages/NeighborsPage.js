import { View, Text, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  OverlayProvider,
  Chat,
  ChannelList,
  ChannelListMessenger,
  Channel,
  Message,
  MessageList,
  MessageInput,
} from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import _Button from "../elements/_Button";
import { useEffect, useState } from "react";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const getChannels = async (action) => {
  try {
    const channels = await client.queryChannels(
      {
        type: "messaging",
        members: { $in: ["Z4U6kBXHJMPjdtKfazGGOacLsmn1"] },
      },
      {},
      // { watch: true, state: true },
    );
    console.log(channels);
    action(channels);
  } catch (e) {
    console.error(e);
  }
};

const createChat = () => {
  const channel = client.channel(
    "messaging",
    Math.trunc(Math.random() * 1000000),
    {
      members: ["Z4U6kBXHJMPjdtKfazGGOacLsmn1", "bP2bw2PZrHWnF83QVOo1avCUfTK2"],
    },
  );
  channel.create();
  console.log(channel);
};

const NeighborsPage = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    getChannels(setChannels);
  }, []);
  return (
    <View style={{ height: "100%" }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <OverlayProvider>
          <Chat client={client}>
            {/* <_Button action={createChat} text="Create chat" disabled={false} /> */}
            {!selectedChannel ? (
              <View
                style={{
                  backgroundColor: "red",
                  height: "2rem",
                  flex: 1,
                }}
              >
                <ChannelList
                  filters={{
                    members: {
                      $in: ["Z4U6kBXHJMPjdtKfazGGOacLsmn1"],
                    },
                  }}
                  onError={(err) => {
                    console.error(err);
                  }}
                  onSelect={(channel) => {
                    setSelectedChannel(channel);
                  }}
                  // channels={channels}
                />
              </View>
            ) : (
              <Channel channel={selectedChannel}>
                <MessageList />
                <MessageInput />
              </Channel>
            )}
          </Chat>
        </OverlayProvider>
      </GestureHandlerRootView>
    </View>
  );
};
export default NeighborsPage;
