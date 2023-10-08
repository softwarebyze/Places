import { useRoute, useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { View, Text } from "react-native";

import _Button from "../elements/_Button";
import Styles from "../styles/Styles";

const ChannelInfoPage = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const { channelInfo } = route.params;

  const addChannel = async () => {
    const auth = getAuth();
    await channelInfo.addMembers([auth.currentUser.uid]);
    console.log("added member");
    navigator.navigate("PlacesChat", { channel: channelInfo });
    console.log(`you are entering ${channelInfo.data.name}'s chat!`);
  };
  return (
    <View style={Styles.page}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
          {channelInfo.data.interest}
        </Text>
        <Text style={{ color: "gray" }}>
          {channelInfo.data.member_count || 0} members
        </Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <Text style={{ color: "gray", fontSize: 16 }}>
          This is the beginning of
          <Text style={{ fontWeight: "bold", color: "black" }}>
            {" "}
            {channelInfo.data.name}{" "}
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
