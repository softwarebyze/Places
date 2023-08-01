import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { useState } from "react";
import Colors from "../../../settings/Colors";
// To deploy, ollow https://docs.expo.dev/versions/latest/sdk/map-view/#deploy-app-with-google-maps

const initialRegion = {
  latitude: 32.0853,
  longitude: 34.781768,
  latitudeDelta: 1,
  longitudeDelta: 1,
};

const markers = [
  {
    location: { latitude: 32.0853, longitude: 34.781768 },
    title: "Tel Aviv",
    description: "A fun place with nice beaches",
  },
  {
    location: {
      latitude: 31.771959,
      longitude: 35.217018,
    },
    title: "Jerusalem",
    description: "A very holy place",
  },
  {
    location: {
      latitude: 32.794044,
      longitude: 34.989571,
    },
    title: "Haifa",
    description: "A nice place in the north",
  },
];

const SlideUpPanel = ({ title, description, onClose }) => {
  return (
    <View style={styles.slideUpPanel}>
      <Text style={styles.panelTitle}>{title}</Text>
      <Text style={styles.panelDescription}>{description}</Text>
      <TouchableOpacity style={styles.interestedButton} onPress={onClose}>
        <Text style={styles.buttonText}>I'm interested</Text>
      </TouchableOpacity>
    </View>
  );
};

const MapsPage = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const closeSlideUpPanel = () => {
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
            <Image source={require("../../../assets/marker.png")} />
          </Marker>
        ))}
      </MapView>
      {selectedMarker && (
        <View style={styles.markerInfoContainer}>
          <SlideUpPanel
            title={selectedMarker.title}
            description={selectedMarker.description}
            onClose={closeSlideUpPanel}
          />
        </View>
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
    paddingHorizontal: 20,
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
