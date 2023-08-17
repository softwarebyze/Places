import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { useEffect, useRef, useState } from "react";
import Colors from "../../settings/Colors";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
// To deploy, follow https://docs.expo.dev/versions/latest/sdk/map-view/#deploy-app-with-google-maps

const initialRegion = {
  latitude: 32.0853,
  longitude: 34.781768,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const Divider = () => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <View
      style={{
        flex: 1,
        borderBottomColor: "#EEEEEE",
        borderBottomWidth: 1,
        backgroundColor: "black",
      }}
    />
  </View>
);

const SlideUpPanel = ({
  title,
  description,
  address,
  onClose,
  date,
  time,
  city,
  state,
  zip,
}) => {
  return (
    <View style={styles.slideUpPanel}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "center",
          paddingTop: 4,
          paddingBottom: 34,
        }}
      >
        <Text style={styles.panelTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <AntDesign name="closecircle" size={24} color="lightgrey" />
        </TouchableOpacity>
      </View>

      <Divider />

      <View>
        <View
          style={{
            paddingVertical: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <EvilIcons
            name="location"
            size={24}
            color="lightgray"
            style={{ marginRight: 8 }}
          />
          <View>
            <Text style={{ color: Colors.dark_grey }}>{address}</Text>
            <Text
              style={{ color: Colors.dark_grey }}
            >{`${city} ${state} ${zip}`}</Text>
          </View>
        </View>
        <Divider />

        <View
          style={{
            flexDirection: "row",
            paddingVertical: 16,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Feather
              name="calendar"
              size={24}
              color="lightgrey"
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: Colors.dark_grey }}>{date}</Text>
          </View>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 60,
            }}
          >
            <Feather
              name="clock"
              size={24}
              color="lightgrey"
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: Colors.dark_grey }}>{time}</Text>
          </View>
        </View>
      </View>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 16,
        }}
      >
        <Text style={[styles.panelDescription, { color: Colors.dark_grey }]}>
          {description}
        </Text>
      </View>
      <Divider />
      <TouchableOpacity style={styles.interestedButton} onPress={onClose}>
        <Text style={styles.buttonText}>I'm interested</Text>
      </TouchableOpacity>
    </View>
  );
};

const FloatingPlusButton = (props) => (
  <Ionicons
    name="add-circle"
    size={58}
    backgroundColor="white"
    color={Colors.orange}
    style={{
      position: "absolute",
      bottom: 26,
      right: 26,
    }}
    onPress={props.onPress}
  />
);

const convertTimestampToDateAndTime = (timestamp) => {
  const dateObj = new Date(timestamp.seconds * 1000);
  return {
    date: format(dateObj, "MM/dd/yyyy"),
    time: format(dateObj, "h:mm a").toLocaleLowerCase(),
  };
};

const MapsPage = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showCreateEventSheet, setShowCreateEventSheet] = useState(false);
  const eventDetailsBottomSheetRef = useRef(null);
  const createEventBottomSheetRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, "events");
        const eventsSnapshot = await getDocs(eventsCollection);
        const eventsData = eventsSnapshot.docs.map((doc) => {
          const eventData = doc.data();
          return {
            ...eventData,
            location: {
              latitude: eventData.location._lat,
              longitude: eventData.location._long,
            },
            datetime: convertTimestampToDateAndTime(eventData.datetime),
          };
        });
        setMarkers(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const closeSlideUpPanel = () => {
    setSelectedMarker(null);
  };

  const onEventDetailsBottomSheetChange = (code) => {
    if (code === -1) {
      setSelectedMarker(null);
    }
  };

  const onCreateEventBottomSheetChange = (code) => {
    if (code === -1) {
      setShowCreateEventSheet(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.location}
            onPress={() => handleMarkerPress(marker)}
          >
            <Image source={require("../../assets/marker.png")} />
          </Marker>
        ))}
      </MapView>
      <FloatingPlusButton
        onPress={() => {
          setShowCreateEventSheet(true);
        }}
      />
      {selectedMarker && (
        <BottomSheet
          ref={eventDetailsBottomSheetRef}
          snapPoints={["62%"]}
          enablePanDownToClose={true}
          style={{ flex: 1 }}
          onChange={onEventDetailsBottomSheetChange}
        >
          <View style={styles.markerInfoContainer}>
            <SlideUpPanel
              title={selectedMarker.title}
              description={selectedMarker.description}
              onClose={closeSlideUpPanel}
              address={selectedMarker.address}
              city={selectedMarker.city}
              state={selectedMarker.state}
              zip={selectedMarker.zip}
              date={selectedMarker.datetime.date}
              time={selectedMarker.datetime.time}
            />
          </View>
        </BottomSheet>
      )}
      {showCreateEventSheet && (
        <BottomSheet
          ref={createEventBottomSheetRef}
          snapPoints={["62%"]}
          enablePanDownToClose={true}
          style={{ flex: 1 }}
          onChange={onCreateEventBottomSheetChange}
        >
          <Text>Create event sheet</Text>
        </BottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
  markerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  slideUpPanel: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.primary1_100,
  },
  panelDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  interestedButton: {
    backgroundColor: Colors.primary1_100,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 20,
  },
  buttonText: {
    color: Colors.white_100,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapsPage;
