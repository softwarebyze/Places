import { Text, View, Image } from "react-native";
import Colors from "../../../settings/Colors";
import _Button from "../elements/_Button";

const NoResults = (props) => {
  return (
    <View
      style={{ justifyContent: "center", backgroundColor: Colors.light_grey }}
    >
      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Image source={require("../../../assets/no-result-icon.png")} />
        <Text style={{ fontWeight: 700 }}>No Results Found</Text>
      </View>
    </View>
  );
};

export default NoResults;
