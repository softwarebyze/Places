import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import STYLES from "../styles/Styles";
import Colors from "../../../settings/Colors";

const CategoryPage = () => {
  return (
    <SafeAreaView style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          height: "9%",
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: "white",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginLeft: 10 }}
        >
          <Image
            source={require("../../../assets/interest_images/football.png")}
          />
          <View style={{ marginLeft: 15 }}>
            <Text>American Football/New York City</Text>
            <Text>15 members</Text>
          </View>
        </View>
        <View style={{ alignSelf: "center" }}>
          <Image
            source={require("../../../assets/interest_images/arrow.png")}
          />
        </View>
      </View>
      <View>
        {/* <Image source = {require("../../../assets/interest_images/baseball.png")}/> */}
        <Text>Baseball/New York City</Text>
        <Image source={require("../../../assets/interest_images/arrow.png")} />
      </View>
      <View>
        <Image
          source={require("../../../assets/interest_images/basketball.png")}
        />
        <Text>Basketball/New York City</Text>
        <Image source={require("../../../assets/interest_images/arrow.png")} />
      </View>
      <View>
        <Image source={require("../../../assets/interest_images/boxing.png")} />
        <Text>Boxing/New York City</Text>
        <Image source={require("../../../assets/interest_images/arrow.png")} />
      </View>
      <View>
        <Image
          source={require("../../../assets/interest_images/climbing.png")}
        />
        <Text>Climbing/New York City</Text>
        <Image source={require("../../../assets/interest_images/arrow.png")} />
      </View>
      <View>
        <Image
          source={require("../../../assets/interest_images/cycling.png")}
        />
        <Text>Cycling/New York City</Text>
        <Image source={require("../../../assets/interest_images/arrow.png")} />
      </View>
      <View>
        <Image source={require("../../../assets/interest_images/golf.png")} />
        <Text>Golf/New York City</Text>
        <Image source={require("../../../assets/interest_images/arrow.png")} />
      </View>
      <View />
    </SafeAreaView>
  );
};

export default CategoryPage;
