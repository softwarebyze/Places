import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../settings/Terms";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Colors from "../../settings/Colors";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

const terms = TERMS["English"];
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

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
  const navigator = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigator.navigate("Category", { interests: props.interests })
      }
      style={STYLES.category}
      color="primary1_100"
      borderColor="primary1_100"
      textColor="white_100"
    >
      {props.image}
      <Text style={STYLES.categoryText}>{props.category}</Text>
    </TouchableOpacity>
  );
};

const JoinPlacePage = () => {
  const route = useRoute();
  const { location } = route.params;

  const [sports, setSports] = useState([]);
  const [buyAndSell, setBuyAndSell] = useState([]);
  const [donations, setDonations] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [services, setServices] = useState([]);

  const queryCategoryChannels = async (category) => {
    const categoryChannels = [];
    for (let i = 0; i < 3; i++) {
      const newCategoryChannels = await client.queryChannels(
        {
          type: "team",
          category: category,
          location: location,
        },
        {},
        { limit: 30, offset: 30 * i },
      );
      categoryChannels.push(...newCategoryChannels);
      const categoryData = categoryChannels.map((c) => c.data);
      return categoryData;
    }
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
    { interests: sports, image: <SportsImage />, category: "Sports" },
    { interests: buyAndSell, image: <BuyAndSellImage />, category: "Buy/Sell" },
    { interests: donations, image: <DonationsImage />, category: "Donations" },
    { interests: hobbies, image: <HobbiesImage />, category: "Hobbies" },
    { interests: services, image: <ServicesImage />, category: "Services" },
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
            interests={category.interests}
            image={category.image}
            category={category.category}
          />
        ))}
      </View>
    </View>
  );
};

export default JoinPlacePage;
