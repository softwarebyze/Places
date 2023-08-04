import { Text, View, Image, ScrollView } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import _Button from "../elements/_Button";
import Searchbar from "../elements/Searchbar";
import NoResults from "../elements/NoResults";
import STYLES from "../styles/Styles";
import Colors from "../../../settings/Colors";
import { data } from "../../../data.json";

const [interests, setInterests] = useState([]);

const CategoryPage = () => {
  const interestList = JSON.parse(interests);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Searchbar />

      <ScrollView
        style={{
          backgroundColor: Colors.light_grey,
          width: "100%",
          paddingTop: 20,
        }}
      >
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/football.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                American Football/New York City
              </Text>
              <Text style={STYLES.catPageMembersText}>15 members</Text>
            </View>
          </View>
          <View style={STYLES.catPageArrow}>
            <Image
              source={require("../../../assets/interest_images/arrow.png")}
            />
          </View>
        </View>

        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text style={{ color: "grey" }}> Not seeing your interest? </Text>
          <Text style={{ color: "grey" }}>
            Submit a request and we will add it to the list?
          </Text>
          <_Button
            text={"Request a New Interest"}
            color={"primary1_100"}
            borderColor={"light_grey"}
            textColor="white_100"
            underline={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryPage;
