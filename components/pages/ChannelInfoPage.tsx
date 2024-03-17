import { Octicons, Ionicons } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { View, Text } from "react-native";

import Colors from "../../settings/Colors";
import _Button from "../elements/_Button";
import { ChannelInfoPageProps } from "../navigation/types";

const ChannelInfoPage = () => {
  const navigation = useNavigation<ChannelInfoPageProps["navigation"]>();
  const route = useRoute<ChannelInfoPageProps["route"]>();
  const { channelInfo } = route.params;

  const addChannel = async () => {
    await channelInfo.addMembers([auth().currentUser.uid]);
    console.log("added member");
    navigation.popToTop();
    navigation.navigate("PlacesChat", { channel: channelInfo });
    console.log(`you are entering ${channelInfo.data.name}'s chat!`);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light_grey,
        alignItems: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          borderRadius: 6,
          backgroundColor: Colors.white_100,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingVertical: 17,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{ uri: channelInfo.data.image }}
              style={{ width: 28, height: 28, marginEnd: 10 }}
            />
            <View style={{ gap: 1 }}>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                {channelInfo.data.interest}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="location"
                  style={{ marginRight: 2 }}
                  size={14}
                  color={Colors.dark_grey}
                />
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 14,
                    color: Colors.dark_grey,
                  }}
                >
                  {channelInfo.data.location.split(",")[0]}
                </Text>
              </View>
            </View>
          </View>
          <Text>Share</Text>
        </View>
        <View
          style={{
            borderColor: Colors.dark_grey,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            paddingVertical: 14,
          }}
        >
          <Text>
            Welcome to the {channelInfo.data.name} group! We are a community of{" "}
            {channelInfo.data.member_count || 0} members who are passionate
            about {channelInfo.data.interest}.
          </Text>
        </View>
        <View
          style={{ flexDirection: "row", width: "100%", paddingVertical: 10 }}
        >
          <Octicons style={{ marginRight: 10 }} name="history" size={18} />
          <View>
            <Text style={{ fontWeight: "600" }}>History</Text>
            <Text style={{ paddingEnd: 18 }}>
              Group created on{" "}
              {new Date(channelInfo.data.created_at).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </Text>
          </View>
        </View>

        <View
          style={{ flexDirection: "row", width: "100%", paddingVertical: 10 }}
        >
          <Ionicons
            style={{ marginRight: 10 }}
            name="lock-open-outline"
            size={18}
          />
          <View>
            <Text style={{ fontWeight: "600" }}>Public</Text>
            <Text style={{ paddingEnd: 18 }}>
              Anyone can see the messages and members of this chat
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          padding: 20,
          borderRadius: 6,
          backgroundColor: Colors.white_100,
          marginVertical: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons name="people" style={{ marginRight: 10 }} size={18} />
          <Text style={{ fontWeight: "600" }}>Members</Text>
        </View>
        <Text
          style={{
            color: Colors.primary1_100,
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {channelInfo.data.member_count || 0}
        </Text>
      </View>
      <_Button
        action={addChannel}
        style={{
          marginTop: 23,
        }}
        text="Join"
      />
    </View>
  );
};

export default ChannelInfoPage;
