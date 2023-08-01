import { Image, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
import { useState } from "react";
// To deploy, follow https://docs.expo.dev/versions/latest/sdk/map-view/#deploy-app-with-google-maps

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
    description: "Tel Aviv",
  },
  {
    location: {
      latitude: 31.771959,
      longitude: 35.217018,
    },
    title: "Jerusalem",
    description: "Jerusalem",
  },
  {
    location: {
      latitude: 32.794044,
      longitude: 34.989571,
    },
    title: "Haifa",
    description: "Haifa",
  },
];

const MapsPage = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
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
          <Text style={styles.markerTitle}>{selectedMarker.title}</Text>
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
});

export default MapsPage;
