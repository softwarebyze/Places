import { Text, View, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useState, useMemo, useRef } from "react";
import _Button from "../elements/_Button";
import Searchbar from "../elements/Searchbar";
import NoResults from "../elements/NoResults";
import STYLES from "../styles/Styles";
import Colors from "../../settings/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import SheetHeader from "../elements/SheetHeader";
import SheetBody from "../elements/SheetBody";
import { useRoute } from "@react-navigation/native";

const InterestListItem = ({ interest }) => {
  return (
    <View style={STYLES.catPageGrid}>
      <View style={STYLES.catPageInfo}>
        <Image
          source={{ uri: interest.image }}
          style={{ width: 32, height: 32 }}
        />
        <View style={STYLES.catPageMemberInfo}>
          <Text style={STYLES.catPageLocationText}>{`${interest.name}`}</Text>
          <Text style={STYLES.catPageMembersText}>
            {`${interest.members} members`}
          </Text>
        </View>
      </View>
      <View style={STYLES.catPageArrow}>
        <Image
          style={{ width: 24, height: 24 }}
          source={require("../../assets/interest_images/arrow.png")}
        />
      </View>
    </View>
  );
};
const CategoryPage = () => {
  const route = useRoute();
  const { interests } = route.params;
  const [search, setSearch] = useState("");
  const filteredInterests = interests.filter((interest) =>
    interest.name.toLowerCase().includes(search.toLowerCase()),
  );
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["55%"], []);
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
          <View
            style={{ marginTop: 27, marginBottom: 24, alignItems: "center" }}
          >
            {!filteredInterests.length && <NoResults />}
            <Text
              style={{
                color: "grey",
                textAlign: "center",
                marginHorizontal: 15,
              }}
            >
              Not seeing one of your interests? Submit a request and we will add
              it to the list.
            </Text>
            <_Button
              action={() => setShowPopup(true)}
              style={{ marginTop: 23 }}
              text={"Request a New Interest"}
              color={"primary1_100"}
              borderColor={"light_grey"}
              textColor="white_100"
              underline={false}
            />
          </View>
        </ScrollView>
        {showPopup && (
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onClose={handleClose}
          >
            <View style={{ marginHorizontal: 30 }}>
              <View style={STYLES.sheetHeader}>
                <SheetHeader handleClose={handleClose} />
              </View>
              <SheetBody search={search} />
            </View>
          </BottomSheet>
        )}
      </View>
    </GestureHandlerRootView>
  );
};
export default CategoryPage;
