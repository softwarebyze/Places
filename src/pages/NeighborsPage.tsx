import { useRouter } from 'expo-router'import { getAuth } from "firebase/auth";
import React from "react";
import { View } from "react-native";
import { ChannelList } from "stream-chat-expo";

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
          navigator.navigate("NeighborsChat", { channel });
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
