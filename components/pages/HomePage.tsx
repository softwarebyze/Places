import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { getAuth } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { ChannelList, useChatContext } from "stream-chat-expo";

import { fetchUsersCities } from "../../firebase/users";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import AddCityForm from "../elements/AddCityForm";
import PlacesHeader from "../elements/PlacesHeader";
import { HomePageProps } from "../navigation/types";
import Styles from "../styles/Styles";
const terms = TERMS["English"];

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

const PopularDropdownHeader = (props) => (
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

const JoinANewPlace = (props) => {
  const navigation = useNavigation<HomePageProps["navigation"]>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("JoinPlaceStack", {
          screen: "JoinPlace",
          params: { location: props.location },
        })
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

  const navigation = useNavigation<HomePageProps["navigation"]>();
  const auth = getAuth();
  const { setActiveChannel } = useChatContext();

  return (
    <View style={{ width: "100%" }}>
      <DropdownHeader
        onPress={toggleDropdown}
        heading={props.heading}
        isCollapsed={isCollapsed}
      />
      <Collapsible collapsed={isCollapsed}>
        <View style={{ flex: 1, maxHeight: 350 }}>
          <ChannelList
            filters={{
              type: "team",
              members: { $in: [auth.currentUser.uid] },
              location: { $in: [props.heading] },
            }}
            onSelect={(channel) => {
              setActiveChannel(channel);
              navigation.navigate("PlacesChat");
            }}
          />
          <JoinANewPlace location={props.heading} />
        </View>
      </Collapsible>
    </View>
  );
};

const JoinButton = ({ onSelect }) => (
  <TouchableOpacity onPress={onSelect} style={styles.join}>
    <Text style={styles.joinText}>Join</Text>
  </TouchableOpacity>
);

const Location = (props) => (
  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
    <FontAwesome5 name="map-pin" size={11} color="grey" />
    <Text style={{ color: Colors.dark_grey }}>
      {props.location.split(",")[0]}
    </Text>
  </View>
);

const PopularChannel = ({ channel, onSelect }) => {
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

const PopularDropdown = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [channelList, setChannelList] = useState([]);
  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { client, setActiveChannel } = useChatContext();
  const navigation = useNavigation<HomePageProps["navigation"]>();
  const auth = getAuth();

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const cities = await fetchUsersCities();
        const filters = {
          type: "team",
          members: { $nin: [auth.currentUser.uid] },
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
        setChannelList(channels);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChannels();
  }, []);

  return (
    <View style={{ width: "100%", marginBottom: 16 }}>
      <PopularDropdownHeader
        onPress={toggleDropdown}
        isCollapsed={isCollapsed}
      />
      <Collapsible collapsed={isCollapsed}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={channelList}
            renderItem={({ item }) => (
              <PopularChannel
                channel={item}
                onSelect={() => {
                  setActiveChannel(item);
                  navigation.navigate("PlacesChat");
                }}
              />
            )}
          />
        </View>
      </Collapsible>
    </View>
  );
};

const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [showAddCitySheet, setShowAddCitySheet] = useState(false);
  const addCitySheetRef = useRef(null);
  const [loadingStatus, setLoadingStatus] = useState<string | null>(null);

  const onAddCitySheetChange = (code) => {
    if (code === -1) {
      setShowAddCitySheet(false);
    }
  };

  useEffect(() => {
    const fetchAndSetUsersCities = async () => {
      try {
        setLoadingStatus("Fetching cities");
        const cities = await fetchUsersCities();
        setCities(cities);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingStatus(null);
      }
    };
    fetchAndSetUsersCities();
  }, []);

  return (
    <>
      <PlacesHeader />
      <View
        style={[
          Styles.page,
          {
            backgroundColor: Colors.light_grey,
            alignItems: "flex-start",
            gap: 16,
            marginTop: 16,
          },
        ]}
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
        {showAddCitySheet && (
          <BottomSheet
            ref={addCitySheetRef}
            snapPoints={["62%"]}
            enablePanDownToClose
            style={{ flex: 1 }}
            onChange={onAddCitySheetChange}
          >
            <AddCityForm />
          </BottomSheet>
        )}
      </View>
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
