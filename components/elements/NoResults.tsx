import { Text, View, Image } from "react-native";

import Colors from "../../settings/Colors";

const NoResults = () => (
  <View
    style={{ justifyContent: "center", backgroundColor: Colors.light_grey }}
  >
    <View style={{ alignItems: "center", marginVertical: 18 }}>
      <Image source={require("../../assets/no-result-icon.png")} />
      <Text style={{ fontWeight: "600", fontSize: 20, marginTop: 8 }}>
        No Results Found
      </Text>
    </View>
  </View>
);

export default NoResults;
