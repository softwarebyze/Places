import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
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

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const groupChannelsByCategory = (channelsData) => {
  return channelsData.reduce((acc, channel) => {
    const category = channel.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(channel);
    return acc;
  }, {});
};

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

  const toggleInterest = (interestId) => {
    const interestChosen = userInterests.some((i) => i.id === interestId);

    if (interestChosen) {
      setUserInterests((prevInterests) =>
        prevInterests.filter((i) => i.id !== interestId),
      );
    } else {
      const interestToAdd = channelList.find(
        (channel) => channel.id === interestId,
      );
      if (interestToAdd) {
        setUserInterests((prevInterests) => [...prevInterests, interestToAdd]);
      }
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
        const channelsData = channels.map((c) => c.data);
        setChannelList(channelsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInterests();
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

  const channelsGroupedByCategory = groupChannelsByCategory(channelList);

  return (
    <View style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <ScrollView>
        <View style={{ marginBottom: 20 }}>
          <View>
            {Object.entries(channelsGroupedByCategory).map(
              ([category, channels]) => {
                return (
                  <View key={category}>
                    <Text
                      style={[STYLES.groupLabelText, { marginVertical: 16 }]}
                    >
                      {category.toUpperCase()}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 16,
                      }}
                    >
                      {channels.map((channel) => {
                        return (
                          <InterestTag
                            onPress={() => toggleInterest(channel.id)}
                            label={channel.interest}
                            selected={userInterests.some(
                              (interest) => interest.id === channel.id,
                            )}
                            key={channel.id}
                          />
                        );
                      })}
                    </View>
                  </View>
                );
              },
            )}
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
