import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Channel,
  MessageList,
  MessageInput,
  OverlayProvider,
} from "stream-chat-expo";

import Colors from "../../settings/Colors";
import { PlacesChatPageProps } from "../navigation/types";
import CreatePoll from "../elements/CreatePoll";

const GiphyThing = () => (
  <TouchableOpacity onPress={() => alert("POLL :)")}>
    <View>
      <Text>poll</Text>
    </View>
  </TouchableOpacity>
);

const PlacesChatPage = () => {
  const route = useRoute<PlacesChatPageProps["route"]>();
  const navigator = useNavigation<PlacesChatPageProps["navigation"]>();
  const { channel } = route.params;
  console.log({ channel });
  useLayoutEffect(() => {
    console.log("CHANNEL NAME", channel?.data.name);
    if (channel) {
      navigator.setOptions({
        headerTitle: (props) => (
          <View
            style={{
              backgroundColor: Colors.primary1_100,
              justifyContent: "center",
              flex: 1,
            }}
          >
            <Text style={{ color: "white" }}>{channel.data.name}</Text>
            <Text style={{ color: "white" }}>{channel.data.member_count}</Text>
          </View>
        ),
      });
    }
  }, [channel]);
  return (
    <OverlayProvider>
      <Channel channel={channel} InputGiphySearch={CreatePoll}>
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
