import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Text, View, TouchableOpacity } from "react-native";
import { HomePageProps } from "../navigation/types";
import Styles from "../styles/Styles";
import { JoinButton } from "./JoinButton";
import { Location } from "./Location";

export const PopularChannel = ({ channel, onSelect }) => {
  const navigation = useNavigation<HomePageProps["navigation"]>();
  return (
    <TouchableOpacity
      style={{ padding: 8 }}
      onPress={() =>
        navigation.navigate("ChannelInfo", { channelInfo: channel })
      }
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: channel.data.image }}
          style={{ width: 32, height: 32 }}
        />
        <View style={Styles.catPageMemberInfo}>
          <Text
            style={Styles.catPageLocationText}
          >{`${channel.data.interest}`}</Text>
          <Text style={Styles.catPageMembersText}>
            {`${channel.data.member_count || 0} members`}
          </Text>
        </View>
        <View
          style={{
            marginLeft: "auto",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Location location={channel.data.location} />
          <JoinButton onSelect={onSelect} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
