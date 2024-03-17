import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useChatContext } from "stream-chat-expo";

import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import { JoinPlacePageProps } from "../navigation/types";
import STYLES from "../styles/Styles";

const terms = TERMS["English"];

const SportsImage = () => (
  <Image
    style={{ height: 35, width: 35 }}
    source={require("../../assets/category_images/sports.png")}
  />
);
const BuyAndSellImage = () => (
  <Image
    style={{ height: 35, width: 35 }}
    source={require("../../assets/category_images/buy_and_sell.png")}
  />
);
const DonationsImage = () => (
  <Image
    style={{ height: 35, width: 35 }}
    source={require("../../assets/category_images/donations.png")}
  />
);
const HobbiesImage = () => (
  <Image
    style={{ height: 35, width: 35 }}
    source={require("../../assets/category_images/hobbies.png")}
  />
);
const ServicesImage = () => (
  <Image
    style={{ height: 35, width: 35 }}
    source={require("../../assets/category_images/services.png")}
  />
);

const CategoryCard = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={STYLES.category}>
      {props.image}
      <Text style={STYLES.categoryText}>{props.category}</Text>
    </TouchableOpacity>
  );
};

const JoinPlacePage = () => {
  const route = useRoute<JoinPlacePageProps["route"]>();
  const navigator = useNavigation<JoinPlacePageProps["navigation"]>();
  const { location } = route.params;

  const [sports, setSports] = useState([]);
  const [buyAndSell, setBuyAndSell] = useState([]);
  const [donations, setDonations] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [services, setServices] = useState([]);
  const { client } = useChatContext();

  const queryCategoryChannels = async (category) => {
    const categoryChannels = [];
    for (let i = 0; i < 3; i++) {
      const newCategoryChannels = await client.queryChannels(
        {
          type: "team",
          category,
          location,
        },
        {},
        { limit: 30, offset: 30 * i },
      );
      categoryChannels.push(...newCategoryChannels);
    }
    return categoryChannels;
  };

  useEffect(() => {
    const fetchInterests = async () => {
      const sportsChannelsData = await queryCategoryChannels("Sports");
      setSports(sportsChannelsData);
      const buyAndSellChannelsData = await queryCategoryChannels("Buy/Sell");
      setBuyAndSell(buyAndSellChannelsData);
      const donationsChannelsData = await queryCategoryChannels("Donations");
      setDonations(donationsChannelsData);
      const hobbiesChannelsData = await queryCategoryChannels("Hobbies");
      setHobbies(hobbiesChannelsData);
      const servicesChannelsData = await queryCategoryChannels("Services");
      setServices(servicesChannelsData);
    };
    fetchInterests();
  }, []);

  const categories = [
    { channels: sports, image: <SportsImage />, category: "Sports" },
    { channels: buyAndSell, image: <BuyAndSellImage />, category: "Buy/Sell" },
    { channels: donations, image: <DonationsImage />, category: "Donations" },
    { channels: hobbies, image: <HobbiesImage />, category: "Hobbies" },
    { channels: services, image: <ServicesImage />, category: "Services" },
  ];

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
        {categories.map((category) => (
          <CategoryCard
            onPress={() =>
              navigator.navigate("Category", {
                channels: category.channels,
              })
            }
            key={category.category}
            channels={category.channels}
            image={category.image}
            category={category.category}
          />
        ))}
      </View>
    </View>
  );
};

export default JoinPlacePage;
