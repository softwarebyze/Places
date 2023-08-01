import { Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import _Button from "../elements/_Button";
import Searchbar from "../elements/Searchbar";
import STYLES from "../styles/Styles";
import Colors from "../../../settings/Colors";

const CategoryPage = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", paddingHorizontal: 16 }}
    >
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
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/baseball.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                Baseball/New York City
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
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/basketball.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                Basketball/New York City
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
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/boxing.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                Boxing/New York City
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
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/climbing.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                Climbing/New York City
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
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/cycling.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                Cycling/New York City
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
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/golf.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>Golf/New York City</Text>
              <Text style={STYLES.catPageMembersText}>15 members</Text>
            </View>
          </View>
          <View style={STYLES.catPageArrow}>
            <Image
              source={require("../../../assets/interest_images/arrow.png")}
            />
          </View>
        </View>
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/gymnastics.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                Gymnastics/New York City
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
        <View style={STYLES.catPageGrid}>
          <View style={STYLES.catPageInfo}>
            <Image
              source={require("../../../assets/interest_images/hockey.png")}
            />
            <View style={STYLES.catPageMemberInfo}>
              <Text style={STYLES.catPageLocationText}>
                Ice Hockey/New York City
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
        <View />

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
