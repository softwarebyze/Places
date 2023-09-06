import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Collapsible from "react-native-collapsible";
import { ChannelList } from "stream-chat-expo";

import { fetchUsersCities } from "../../firebase/users";

import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import AddCityForm from "../elements/AddCityForm";
import PlacesHeader from "../elements/PlacesHeader";
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

const HomePage = () => {
  const [cities, setCities] = useState([]);
  const [showAddCitySheet, setShowAddCitySheet] = useState(false);
  const addCitySheetRef = useRef(null);

  const onAddCitySheetChange = (code) => {
    if (code === -1) {
      setShowAddCitySheet(false);
    }
  };

  useEffect(() => {
    const fetchAndSetUsersCities = async () => {
      try {
        const cities = await fetchUsersCities();
        setCities(cities);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAndSetUsersCities();
  }, [cities]);

  return (
    <>
      <PlacesHeader />
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

        {cities.map((city) => (
          <Dropdown heading={city} key={city} />
        ))}

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
});
