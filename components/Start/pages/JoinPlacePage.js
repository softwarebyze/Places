import { TouchableOpacity, Image, View } from "react-native";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../settings/Colors";
const terms = TERMS["English"];

const JoinPlacePage = () => {
  const navigator = useNavigation();
  return (
    <View style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={STYLES.groupLabelText}>{terms["0028"]}</Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity
          onPress={() => navigator.navigate("Category")}
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            source={require("../../../assets/category_images/sports.png")}
          />
          <Text style={STYLES.categoryText}>{terms["0029"]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator.navigate("Category")}
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            source={require("../../../assets/category_images/buy_and_sell.png")}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={STYLES.categoryText}
          >
            {terms["0030"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator.navigate("Category")}
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            source={require("../../../assets/category_images/donations.png")}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={STYLES.categoryText}
          >
            {terms["0031"]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigator.navigate("Category")}
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            source={require("../../../assets/category_images/hobbies.png")}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={STYLES.categoryText}
          >
            {terms["0032"]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinPlacePage;
