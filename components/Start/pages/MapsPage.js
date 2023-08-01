import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import { View } from "react-native";
// To deploy, follow https://docs.expo.dev/versions/latest/sdk/map-view/#deploy-app-with-google-maps

const MapsPage = () => {
  return (
    <View>
      <MapView style={styles.map} />
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
