import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import TERMS from "../../settings/Terms";
const terms = TERMS["English"];
import _Button from "../elements/_Button";
import { useNavigation } from "@react-navigation/native";
import Styles from "../styles/Styles";
import Collapsible from "react-native-collapsible";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../settings/Colors";
import { StreamChat } from "stream-chat";
import { ChannelList } from "stream-chat-expo";
import { getAuth } from "firebase/auth";
import BottomSheet from "@gorhom/bottom-sheet";
import CitiesDropdown from "../elements/CitiesDropdown";

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

const JoinANewPlace = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("JoinPlace", { location: props.location })
      }
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
    <View style={{ width: "100%", marginBottom: 16 }}>
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
          <JoinANewPlace location={props.heading} />
        </View>
      </Collapsible>
    </View>
  );
};

const AddCityForm = () => {
  const [city, setCity] = useState(null);
  return (
    <View>
      <Text>Add a City</Text>
      <CitiesDropdown onSelect={setCity} />
    </View>
  );
};

const HomePage = () => {
  const auth = getAuth();
  const [channelList, setChannelList] = useState([]);
  const [showAddCitySheet, setShowAddCitySheet] = useState(false);
  const addCitySheetRef = useRef(null);

  const onAddCitySheetChange = (code) => {
    if (code === -1) {
      setShowAddCitySheet(false);
    }
  };

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
    <View
      style={[
        Styles.page,
        {
          backgroundColor: Colors.light_grey,
          alignItems: "flex-start",
        },
      ]}
    >
      <Text style={Styles.groupLabelText}>Your Places</Text>
      {Object.entries(channelsGroupedByLocation).map(([location, channels]) => {
        return (
          <Dropdown heading={location} channels={channels} key={location} />
        );
      })}
      <TouchableOpacity
        onPress={() => setShowAddCitySheet(true)}
        style={styles.addACity}
      >
        <Text style={styles.addACityText}>{`+ ${terms["add_a_city"]}`}</Text>
      </TouchableOpacity>
      {showAddCitySheet && (
        <BottomSheet
          ref={addCitySheetRef}
          snapPoints={["62%"]}
          enablePanDownToClose={true}
          style={{ flex: 1 }}
          onChange={onAddCitySheetChange}
        >
          <AddCityForm />
        </BottomSheet>
      )}
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  addACity: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
    borderColor: Colors.dark_grey,
  },
  addACityText: {
    color: Colors.dark_grey,
    fontSize: 14,
    fontWeight: "600",
  },
});
