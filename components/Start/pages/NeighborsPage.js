import { View } from "react-native";
import React from "react";
import { ChannelList } from "stream-chat-expo";
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
