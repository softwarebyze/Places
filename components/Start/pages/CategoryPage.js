import { Text, View, Image, ScrollView } from "react-native";
import _Button from "../elements/_Button";
import Searchbar from "../elements/Searchbar";
import NoResults from "../elements/NoResults";
import STYLES from "../styles/Styles";
import Colors from "../../../settings/Colors";
import { interests } from "../../../data.js";

const CategoryPage = () => {
  console.log(interests);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Searchbar />

      <ScrollView
        style={{
          backgroundColor: Colors.light_grey,
          width: "100%",
        }}
      >
        {interests.map((interest, index) => (
          <View key={index} style={STYLES.catPageGrid}>
            <View style={STYLES.catPageInfo}>
              <Image
                source={{ uri: interest.image }}
                style={{ width: 32, height: 32 }}
              />
              <View style={STYLES.catPageMemberInfo}>
                <Text style={STYLES.catPageLocationText}>
                  {`${interest.name}/New York City`}
                </Text>
                <Text style={STYLES.catPageMembersText}>
                  {`${interest.members} members`}
                </Text>
              </View>
            </View>
            <View style={STYLES.catPageArrow}>
              <Image
                source={require("../../../assets/interest_images/arrow.png")}
              />
            </View>
          </View>
        ))}

        <View style={{ marginTop: 27, marginBottom: 24, alignItems: "center" }}>
          <Text style={{ color: "grey" }}> Not seeing your interest? </Text>
          <Text style={{ color: "grey" }}>
            Submit a request and we will add it to the list.
          </Text>
          <_Button
            style={{ marginTop: 23 }}
            text={"Request a New Interest"}
            color={"primary1_100"}
            borderColor={"light_grey"}
            textColor="white_100"
            underline={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryPage;
