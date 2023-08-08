import { Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import _Button from "../elements/_Button";
import Searchbar from "../elements/Searchbar";
import NoResults from "../elements/NoResults";
import STYLES from "../styles/Styles";
import Colors from "../../../settings/Colors";
import { interests } from "../../../data.js";

const InterestListItem = ({ interest }) => {
  return (
    <View style={STYLES.catPageGrid}>
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
        <Image source={require("../../../assets/interest_images/arrow.png")} />
      </View>
    </View>
  );
};

const CategoryPage = () => {
  const [search, setSearch] = useState("");
  const filteredInterests = interests.filter((interest) =>
    interest.name.includes(search.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Searchbar onChange={setSearch} />

      <ScrollView
        style={{
          backgroundColor: Colors.light_grey,
          width: "100%",
        }}
      >
        {filteredInterests.map((interest, index) => (
          <InterestListItem interest={interest} key={index} />
        ))}

        <View style={{ marginTop: 27, marginBottom: 24, alignItems: "center" }}>
          {!filteredInterests.length && <NoResults />}
          <Text
            style={{ color: "grey", textAlign: "center", marginHorizontal: 15 }}
          >
            Not seeing one of your interests? Submit a request and we will add
            it to the list.
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
