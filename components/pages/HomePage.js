import { Text, View, TouchableOpacity, Image } from "react-native";
import TERMS from "../../settings/Terms";
const terms = TERMS["English"];
import _Button from "../elements/_Button";
import { useNavigation } from "@react-navigation/native";
import Styles from "../styles/Styles";
import Collapsible from "react-native-collapsible";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../settings/Colors";
import { StreamChat } from "stream-chat";
import { ChannelList } from "stream-chat-expo";
import { getAuth } from "firebase/auth";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const groupChannelsByLocation = (channels) => {
  return channels.reduce((acc, channel) => {
    const location = channel.data.location;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(channel);
    return acc;
  }, {});
};

const DropdownHeader = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: Colors.primary1_100,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 6,
    }}
    onPress={props.onPress}
  >
    <Text
      style={[
        Styles.whiteText,
        Styles.blueDropdownHeader,
        { fontWeight: "bold" },
      ]}
    >
      {props.heading}
    </Text>
    {props.isCollapsed ? (
      <Ionicons name="chevron-down-outline" size={24} color="white" />
    ) : (
      <Ionicons name="chevron-up-outline" size={24} color="white" />
    )}
  </TouchableOpacity>
);

const JoinANewPlace = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("JoinPlace")}
      style={{
        backgroundColor: Colors.white_100,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="add" size={24} color={Colors.orange} />
        <Text
          style={{
            color: Colors.orange,
            fontWeight: "600",
            fontSize: 16,
            paddingStart: 4,
          }}
        >
          {terms["0026"]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Dropdown = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigation = useNavigation();
  const auth = getAuth();

  return (
    <View style={{ width: "100%", flex: 1 }}>
      <DropdownHeader
        onPress={toggleDropdown}
        heading={props.heading}
        isCollapsed={isCollapsed}
      />

      <Collapsible collapsed={isCollapsed} containerStyle={{ borderRadius: 0 }}>
        <View style={{ flex: 1 }}>
          <ChannelList
            filters={{
              type: "team",
              members: { $in: [auth.currentUser.uid] },
              location: { $in: [props.heading] },
            }}
            onSelect={(channel) => {
              navigation.navigate("PlacesChat", { channel });
            }}
          />
          <JoinANewPlace />
        </View>
      </Collapsible>
    </View>
  );
};

const HomePage = () => {
  const auth = getAuth();
  const [channelList, setChannelList] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const channels = await client.queryChannels(
          {
            type: "team",
            members: { $in: [auth.currentUser.uid] },
          },
          {},
          { limit: 30 },
        );
        setChannelList(channels);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChannels();
  }, []);

  const channelsGroupedByLocation = groupChannelsByLocation(channelList);
  return (
    <View style={[Styles.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={Styles.groupLabelText}>Your Places</Text>
      {Object.entries(channelsGroupedByLocation).map(([location, channels]) => {
        return (
          <Dropdown heading={location} channels={channels} key={location} />
        );
      })}
    </View>
  );
};
export default HomePage;
