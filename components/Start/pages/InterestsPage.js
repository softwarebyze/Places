import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../settings/Colors";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import { StreamChat } from "stream-chat";
import { useEffect } from "react";

const terms = TERMS["English"];
const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

export const InterestTag = (props) => {
  return (
    <TouchableOpacity
      style={[
        {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 8,
          paddingVertical: 8,
          borderRadius: 6,
          gap: 4,
        },
        props.selected ? STYLES.tagSelected : STYLES.tagNotSelected,
      ]}
      onPress={props.onPress}
    >
      <Text
        style={
          props.selected ? STYLES.tagSelectedText : STYLES.tagNotSelectedText
        }
      >
        {props.label}
      </Text>
      {props.selected ? (
        <Ionicons name="close" size={24} color={Colors.white_100} />
      ) : (
        <Ionicons name="add" size={24} color={Colors.dark_grey} />
      )}
    </TouchableOpacity>
  );
};

const InterestsPage = () => {
  const navigator = useNavigation();
  const route = useRoute();
  const REQUIRED_INTERESTS = 5;
  const [userInterests, setUserInterests] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [loading, setLoading] = useState(false);

  const disabled = userInterests.length < REQUIRED_INTERESTS;

  const toggleInterest = (interest) => {
    if (userInterests.some((i) => i.name === interest.name)) {
      setUserInterests(userInterests.filter((i) => i.name !== interest.name));
    } else {
      setUserInterests([...userInterests, interest]);
    }
  };

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const channels = [];
        for (let i = 0; i < 3; i++) {
          const newChannels = await client.queryChannels(
            {
              type: "team",
              location: route.params.location,
            },
            {},
            { limit: 30, offset: 30 * i },
          );
          channels.push(...newChannels);
        }
        setChannelList(channels);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInterests(setChannelList);
  }, []);

  const addUserToChannels = async (userId, interests, location) => {
    try {
      const channels = await Promise.all(
        interests.map(async (interest) => {
          const channel = client.channel("team", interest.id);
          await channel.addMembers([userId]);
        }),
      );
      return channels;
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmitInterests = async () => {
    setLoading(true);
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    const interests = userInterests.map((interest) => interest.name);
    await setDoc(userRef, { interests }, { merge: true });
    await addUserToChannels(userId, userInterests, route.params.location);
    setLoading(false);
    navigator.navigate("HomeTabs");
  };

  return (
    <View style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <ScrollView>
        <Text style={STYLES.descriptionText}>{terms["0023"]}</Text>

        <View style={{ marginBottom: 20 }}>
          <Text style={[STYLES.groupLabelText, { marginVertical: 16 }]}>
            {terms["0024"]}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
            {channelList
              .filter(
                (i) =>
                  i.data.category.toLowerCase() === terms["0024"].toLowerCase(),
              )
              .map((channel) => {
                return (
                  <InterestTag
                    onPress={() =>
                      toggleInterest({
                        name: channel.data.interest,
                        id: channel.data.id,
                      })
                    }
                    label={channel.data.interest}
                    selected={userInterests.some(
                      (interest) => interest.name === channel.data.interest,
                    )}
                    key={channel.cid}
                  />
                );
              })}
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={[STYLES.groupLabelText, { marginVertical: 16 }]}>
            {terms["0025"]}
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
            {channelList
              .filter(
                (i) =>
                  i.data.category.toLowerCase() === terms["0025"].toLowerCase(),
              )
              .map((channel) => {
                return (
                  <InterestTag
                    onPress={() =>
                      toggleInterest({
                        name: channel.data.interest,
                        id: channel.cid,
                      })
                    }
                    label={channel.data.interest}
                    selected={userInterests.some(
                      (interest) => interest.name === channel.data.interest,
                    )}
                    key={channel.cid}
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <_Button
          text="Continue"
          action={handleSubmitInterests}
          color={disabled ? "primary1_030" : "primary1_100"}
          borderColor={disabled ? "light_grey" : "primary1_100"}
          textColor="white_100"
          style={STYLES.startButton}
          disabled={disabled}
        />
      )}
    </View>
  );
};

export default InterestsPage;
