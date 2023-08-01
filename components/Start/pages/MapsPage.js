import { Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";
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
  return (
    <View>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.location}
            title={marker.title}
            description={marker.description}
          >
            <Image source={require("../../../assets/marker.png")} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};
export default MapsPage;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
