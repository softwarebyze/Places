import { Text, View } from "react-native";

import Colors from "../../settings/Colors";

const PlacesHeader = () => (
  <View
    style={{
      height: 103,
      backgroundColor: Colors.primary1_100,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text
      style={{
        fontSize: 36,
        fontWeight: "700",
        paddingTop: 48,
        color: Colors.white_100,
      }}
    >
      PLACES.
    </Text>
  </View>
);

export default PlacesHeader;
