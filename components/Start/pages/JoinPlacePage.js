import { TouchableOpacity, Image, View } from "react-native";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../../settings/Colors";
import { StreamChat } from "stream-chat";
import { useEffect, useState } from "react";
import { query } from "firebase/firestore";
const terms = TERMS["English"];

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

// servicesChannels = query channels filter category: services
// sportsChannels = query channels filter category: sports
// navigate(CategoryPAge, {channels: servicesChannels})

const JoinPlacePage = () => {
  const [sports, setSports] = useState([]);
  const [buyAndSell, setBuyAndSell] = useState([]);
  const [donations, setDonations] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchInterests = async () => {
      // try {
      // setLoading(true);
      const sportsChannels = [];
      for (let i = 0; i < 3; i++) {
        const newSportsChannels = await client.queryChannels(
          {
            type: "team",
            category: "Sports",
            location: "New York City, USA",
          },
          {},
          { limit: 30, offset: 30 * i },
        );
        sportsChannels.push(...newSportsChannels);
        const sportsData = sportsChannels.map((c) => c.data);
        setSports(sportsData);
      }
      const buyAndSellChannels = [];
      for (let i = 0; i < 3; i++) {
        const newBuyAndSellChannels = await client.queryChannels(
          {
            type: "team",
            category: "Buy/Sell",
            location: "New York City, USA",
          },
          {},
          { limit: 30, offset: 30 * i },
        );
        buyAndSellChannels.push(...newBuyAndSellChannels);
        const buyAndSellData = buyAndSellChannels.map((c) => c.data);
        setBuyAndSell(buyAndSellData);
      }
      const donationsChannels = [];
      for (let i = 0; i < 3; i++) {
        const newDonationsChannels = await client.queryChannels(
          {
            type: "team",
            category: "Donations",
            location: "New York City, USA",
          },
          {},
          { limit: 30, offset: 30 * i },
        );
        donationsChannels.push(...newDonationsChannels);
        const donationsData = donationsChannels.map((c) => c.data);
        setDonations(donationsData);
      }
      const hobbiesChannels = [];
      for (let i = 0; i < 3; i++) {
        const newHobbiesChannels = await client.queryChannels(
          {
            type: "team",
            category: "Hobbies",
            location: "New York City, USA",
          },
          {},
          { limit: 30, offset: 30 * i },
        );
        hobbiesChannels.push(...newHobbiesChannels);
        const hobbiesData = hobbiesChannels.map((c) => c.data);
        setHobbies(hobbiesData);
      }
      const servicesChannels = [];
      for (let i = 0; i < 3; i++) {
        const newServicesChannels = await client.queryChannels(
          {
            type: "team",
            category: "Services",
            location: "New York City, USA",
          },
          {},
          { limit: 30, offset: 30 * i },
        );
        servicesChannels.push(...newServicesChannels);
        const servicesData = servicesChannels.map((c) => c.data);
        setServices(servicesData);
      }
      // } catch (error) {
      //   console.error(error);
      // } finally {
      //   setLoading(false);
      // }
    };
    fetchInterests();
  }, []);
  console.log(sports);

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
          onPress={() => navigator.navigate("Category", { interests: sports })}
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../../../assets/category_images/sports.png")}
          />
          <Text style={STYLES.categoryText}>{terms["0029"]}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigator.navigate("Category", { interests: buyAndSell })
          }
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            style={{ height: 35, width: 35 }}
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
          onPress={() =>
            navigator.navigate("Category", { interests: donations })
          }
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            style={{ height: 35, width: 35 }}
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
          onPress={() => navigator.navigate("Category", { interests: hobbies })}
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            style={{ height: 35, width: 35 }}
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
        <TouchableOpacity
          onPress={() =>
            navigator.navigate("Category", { interests: services })
          }
          style={STYLES.category}
          color="primary1_100"
          borderColor="primary1_100"
          textColor="white_100"
        >
          <Image
            style={{ height: 35, width: 35 }}
            source={require("../../../assets/category_images/services.png")}
          />
          <Text
            numberOfLines={1}
            ellipsizeMode="clip"
            style={STYLES.categoryText}
          >
            {terms["0037"]}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default JoinPlacePage;
