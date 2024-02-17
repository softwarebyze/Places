import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { getEvents } from "../../firebase/events";
import Colors from "../../settings/Colors";
import CreateEventSheet from "../elements/CreateEventSheet";

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

const FloatingButton = (props) => (
  <TouchableOpacity
    style={{
      position: "absolute",
      bottom: 18,
      right: 18,
    }}
    {...props}
  >
    {props.children}
  </TouchableOpacity>
);

const MapsPage = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showCreateEventSheet, setShowCreateEventSheet] = useState(false);
  const eventDetailsBottomSheetRef = useRef(null);
  const createEventBottomSheetRef = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      setMarkers(events);
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

  const handleCloseCreateEvent = () => {
    setShowCreateEventSheet(false);
  };

  const handleCloseEventDetails = () => {
    setSelectedMarker(null);
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
            <Image
              style={{ width: 32, height: 38 }}
              source={require("../../assets/marker.svg")}
            />
          </Marker>
        ))}
      </MapView>
      <FloatingButton
        onPress={() => {
          setShowCreateEventSheet(true);
        }}
      >
        <Image
          style={{ width: 70, height: 70 }}
          source={require("../../assets/add-icon.svg")}
        />
      </FloatingButton>

      {selectedMarker && (
        <BottomSheet
          ref={eventDetailsBottomSheetRef}
          snapPoints={["62%"]}
          enablePanDownToClose
          style={{ flex: 1 }}
          onChange={onEventDetailsBottomSheetChange}
          onClose={handleCloseEventDetails}
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
          snapPoints={["96%"]}
          enablePanDownToClose
          onChange={onCreateEventBottomSheetChange}
          onClose={handleCloseCreateEvent}
        >
          <CreateEventSheet onClose={handleCloseCreateEvent} />
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
