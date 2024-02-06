import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  GestureResponderEvent,
} from "react-native";
import { Channel, StreamChat } from "stream-chat";
import { ChannelList } from "stream-chat-expo";

import { cities as allCities } from "../../data/cities";
import { addUserCity, fetchUsersCities } from "../../firebase/users";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import AddCityForm from "../elements/AddCityForm";
import PlacesHeader from "../elements/PlacesHeader";
import { HomePageProps } from "../navigation/types";
import Styles from "../styles/Styles";
const terms = TERMS["English"];

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const DropdownHeader = (props: {
  onPress: (event: GestureResponderEvent) => void;
  heading: string;
  isCollapsed: boolean;
}) => (
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
    <Text style={[Styles.whiteText, { fontWeight: "bold" }]}>
      {props.heading}
    </Text>
    {props.isCollapsed ? (
      <Ionicons name="chevron-down-outline" size={24} color="white" />
    ) : (
      <Ionicons name="chevron-up-outline" size={24} color="white" />
    )}
  </TouchableOpacity>
);

const PopularDropdownHeader = (props: {
  onPress: (event: GestureResponderEvent) => void;
  isCollapsed: boolean;
}) => (
  <TouchableOpacity
    style={{
      backgroundColor: Colors.orange,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 6,
    }}
    onPress={props.onPress}
  >
    <Text style={[Styles.whiteText, { fontWeight: "bold" }]}>
      Popular In Your Cities
    </Text>
    {props.isCollapsed ? (
      <Ionicons name="chevron-down-outline" size={24} color="white" />
    ) : (
      <Ionicons name="chevron-up-outline" size={24} color="white" />
    )}
  </TouchableOpacity>
);

const JoinANewPlace = (props: { location: string }) => {
  const navigation = useNavigation<HomePageProps["navigation"]>();
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
          {terms["join_a_new_place"]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Dropdown = (props: { heading: string }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsCollapsed((prevIsCollapsed) => !prevIsCollapsed);
  };

  const navigation = useNavigation<HomePageProps["navigation"]>();

  return (
    <View style={{ width: "100%" }}>
      <DropdownHeader
        onPress={toggleDropdown}
        heading={props.heading}
        isCollapsed={isCollapsed}
      />
      {!isCollapsed && (
        <>
          <ChannelList
            filters={{
              type: "team",
              members: { $in: [auth().currentUser.uid] },
              location: { $in: [props.heading] },
            }}
            onSelect={(channel) => {
              navigation.navigate("PlacesChat", { channel });
            }}
          />
          <JoinANewPlace location={props.heading} />
        </>
      )}
    </View>
  );
};

const JoinButton = ({ onSelect }) => (
  <TouchableOpacity onPress={onSelect} style={styles.join}>
    <Text style={styles.joinText}>Join</Text>
  </TouchableOpacity>
);

const Location = (props: { location: string }) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
    <FontAwesome5 name="map-pin" size={11} color="grey" />
    <Text style={{ color: Colors.dark_grey }}>
      {props.location.split(",")[0]}
    </Text>
  </View>
);

const PopularChannel = ({ channel, onSelect }) => (
  <TouchableOpacity style={{ padding: 8 }} onPress={onSelect}>
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

const fetchChannels = async () => {
  try {
    const cities = await fetchUsersCities();
    const filters = {
      type: "team",
      members: { $nin: [auth().currentUser.uid] },
      location: { $in: cities },
    };
    console.log(filters);
    const options = { limit: 3, watch: true, state: true };
    const channels = await client.queryChannels(
      filters,
      { member_count: -1 },
      options,
    );
    console.log(channels.length);
    return channels;
  } catch (error) {
    console.error(error);
  }
};

const PopularDropdown = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [channelList, setChannelList] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!refetch) return;
    const fetchAndSetChannels = async () => {
      const channels = await fetchChannels();
      setChannelList(channels);
    };
    fetchAndSetChannels();
    setRefetch(false);
  }, [refetch]);

  const navigation = useNavigation<HomePageProps["navigation"]>();

  const joinAndEnterChannel = async (channel: Channel) => {
    const userId = auth().currentUser.uid;
    try {
      await channel.addMembers([userId]);
    } catch (error) {
      console.error(error);
    }

    setRefetch(true);

    navigation.navigate("PlacesChat", { channel });
  };

  return (
    <View style={{ width: "100%", marginBottom: 16 }}>
      <PopularDropdownHeader
        onPress={toggleDropdown}
        isCollapsed={isCollapsed}
      />
      {!isCollapsed && (
        <FlatList
          data={channelList}
          renderItem={({ item }) => (
            <PopularChannel
              channel={item}
              onSelect={() => joinAndEnterChannel(item)}
            />
          )}
        />
      )}
    </View>
  );
};

const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [showAddCitySheet, setShowAddCitySheet] = useState(false);
  const addCitySheetRef = useRef(null);
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);

  const noMoreCities = cities.length >= allCities.length;

  const onAddCitySheetChange = (code: number) => {
    if (code === -1) {
      setShowAddCitySheet(false);
    }
  };

  const handleAddCity = async (city: string) => {
    try {
      setLoadingStatus("Adding city");
      await addUserCity(city);
      const newCities = await fetchUsersCities();
      setCities(newCities);
      setShowAddCitySheet(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStatus(null);
    }
  };

  useEffect(() => {
    if (showAddCitySheet) return;
    const fetchAndSetUsersCities = async () => {
      try {
        // only show loading if it's the first time fetching cities
        if (!cities.length) setLoadingStatus("Fetching cities");
        const newCities = await fetchUsersCities();
        setCities(newCities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStatus(null);
      }
    };
    fetchAndSetUsersCities();
  }, [showAddCitySheet]);

  return (
    <>
      <PlacesHeader />
      <ScrollView
        contentContainerStyle={[
          Styles.page,
          {
            backgroundColor: Colors.light_grey,
            alignItems: "flex-start",
            gap: 16,
            marginTop: 16,
            flex: undefined,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            width: "100%",
          }}
        >
          <Text style={Styles.groupLabelText}>Your Places</Text>
          {loadingStatus ? (
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                alignContent: "center",
              }}
            >
              <ActivityIndicator />
              <Text style={{ alignSelf: "flex-end" }}>
                {`${loadingStatus} ...`}
              </Text>
            </View>
          ) : null}
        </View>

        {cities.map((city) => (
          <Dropdown heading={city} key={city} />
        ))}

        <TouchableOpacity
          onPress={() => setShowAddCitySheet(true)}
          style={styles.addACity}
        >
          <Text style={styles.addACityText}>{`+ ${terms["add_a_city"]}`}</Text>
        </TouchableOpacity>
        <PopularDropdown />
      </ScrollView>
      {showAddCitySheet && (
        <BottomSheet
          ref={addCitySheetRef}
          snapPoints={["62%"]}
          enablePanDownToClose
          style={Styles.page}
          onChange={onAddCitySheetChange}
        >
          {noMoreCities ? (
            <Text style={{ color: Colors.dark_grey, fontSize: 14 }}>
              You've added all the cities!
            </Text>
          ) : (
            <AddCityForm handleAddCity={handleAddCity} currentCities={cities} />
          )}
        </BottomSheet>
      )}
    </>
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
  join: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 6,
    borderColor: Colors.orange,
  },
  joinText: {
    color: Colors.orange,
    fontSize: 14,
    fontWeight: "600",
  },
});
