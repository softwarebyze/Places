import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Channel, StreamChat } from "stream-chat";

import { useAddUserDetails } from "../../firebase/hooks/useAddUserDetails";
import { useUserCities } from "../../firebase/hooks/useUserCities";
import Colors from "../../settings/Colors";
import { useAuth } from "../contexts/AuthContext";
import _Button from "../elements/_Button";
import { InterestsPageProps } from "../navigation/types";
import STYLES from "../styles/Styles";

const client = StreamChat.getInstance(process.env.EXPO_PUBLIC_STREAM_API_KEY);

const groupChannelsByCategory = (channelsData: any[]) => {
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
  const route = useRoute<InterestsPageProps["route"]>();
  const REQUIRED_INTERESTS = 5;
  const [userInterests, setUserInterests] = useState([]);
  const [channelList, setChannelList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { data: cities, isLoading } = useUserCities();
  const city = cities?.[0];
  const { mutate: saveUserDetails, isPending } = useAddUserDetails();

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
    if (isLoading) return;
    const fetchInterests = async () => {
      try {
        setLoading(true);
        const channels = [];
        for (let i = 0; i < 3; i++) {
          const newChannels = await client.queryChannels(
            {
              type: "team",
              location: route?.params?.location || city,
            },
            {},
            { limit: 30, offset: 30 * i },
          );
          console.log({ newChannels });
          channels.push(...newChannels);
        }
        const channelsData = channels.map((c) => c.data);
        setChannelList(channelsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInterests();
  }, []);

  const addUserToChannels = async (userId: string, interests: Channel[]) => {
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
    const interests = userInterests.map((interest) => interest.name);
    saveUserDetails({ interests });
    await addUserToChannels(user.uid, userInterests);
  };

  const channelsGroupedByCategory = groupChannelsByCategory(channelList);

  return (
    <View style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <ScrollView>
        <Text style={[STYLES.descriptionText, { marginTop: 20 }]}>
          {`Select at least ${REQUIRED_INTERESTS} interests and we will add you to
          their group chats in ${city}.`}
        </Text>
        <View style={{ marginBottom: 20 }}>
          <View>
            {Object.entries(channelsGroupedByCategory).map(
              ([category, channels]: [string, any[]]) => {
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
          style={STYLES.startButton}
          disabled={disabled}
        />
      )}
    </View>
  );
};

export default InterestsPage;
