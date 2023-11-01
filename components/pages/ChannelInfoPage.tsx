import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { View, Text } from "react-native";
import { useChatContext } from "stream-chat-expo";

import _Button from "../elements/_Button";
import { ChannelInfoPageProps } from "../navigation/types";
import Styles from "../styles/Styles";

const ChannelInfoPage = () => {
  const navigation = useNavigation<ChannelInfoPageProps["navigation"]>();
  const { channel, setActiveChannel } = useChatContext();

  const addChannel = async () => {
    const auth = getAuth();
    await channel.addMembers([auth.currentUser.uid]);
    console.log("added member");
    setActiveChannel(channel);
    navigation.navigate("PlacesChat");
    console.log(`you are entering ${channel.data.name}'s chat!`);
  };
  return (
    <View style={Styles.page}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
          {channel.data.interest.toString()}
        </Text>
        <Text style={{ color: "gray" }}>
          {channel.data.member_count.toString() || 0} members
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ color: "gray", fontSize: 16 }}>
          This is the beginning of
          <Text style={{ fontWeight: "bold", color: "black" }}>
            {" "}
            {channel.data.name}{" "}
          </Text>
          place
        </Text>
        <_Button
          action={addChannel}
          style={{
            marginTop: 23,
            borderRadius: 18,
            height: 65,
            width: 330,
            marginLeft: 30,
          }}
          text="Join"
        />
      </View>
    </View>
  );
};

export default ChannelInfoPage;
