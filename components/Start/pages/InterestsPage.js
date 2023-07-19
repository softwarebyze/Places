import _Button from "../elements/_Button";
import _Input from "../elements/_Input";
import _Header from "../elements/_Header";
import _Divider from "../elements/_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../settings/Colors";
import { useState } from "react";

const terms = TERMS["English"];

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
  const REQUIRED_INTERESTS = 5;
  const [interests, setInterests] = useState([]);
  console.log(interests);

  const disabled = interests.length < REQUIRED_INTERESTS;

  const toggleInterest = (interest) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <SafeAreaView style={[STYLES.page, { backgroundColor: Colors.light_grey }]}>
      <Text style={STYLES.descriptionText}>{terms["0023"]}</Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={[STYLES.groupLabelText, { marginVertical: 16 }]}>
          {terms["0024"]}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          <InterestTag
            onPress={() => toggleInterest("Soccer")}
            label={"Soccer"}
            selected={interests.includes("Soccer")}
          />
          <InterestTag
            onPress={() => toggleInterest("Basketball")}
            label={"Basketball"}
            selected={interests.includes("Basketball")}
          />
          <InterestTag
            onPress={() => toggleInterest("Tennis")}
            label={"Tennis"}
            selected={interests.includes("Tennis")}
          />
          <InterestTag
            onPress={() => toggleInterest("Golf")}
            label={"Golf"}
            selected={interests.includes("Golf")}
          />
          <InterestTag
            onPress={() => toggleInterest("American_Football")}
            label={"American Football"}
            selected={interests.includes("American_Football")}
          />
          <InterestTag
            onPress={() => toggleInterest("Baseball")}
            label={"Baseball"}
            selected={interests.includes("Baseball")}
          />
        </View>
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text style={[STYLES.groupLabelText, { marginVertical: 16 }]}>
          {terms["0025"]}
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
          <InterestTag
            onPress={() => toggleInterest("Painting")}
            label={"Painting"}
            selected={interests.includes("Painting")}
          />
          <InterestTag
            onPress={() => toggleInterest("Photography")}
            label={"Photography"}
            selected={interests.includes("Photography")}
          />
          <InterestTag
            onPress={() => toggleInterest("Yoga")}
            label={"Yoga"}
            selected={interests.includes("Yoga")}
          />
          <InterestTag
            onPress={() => toggleInterest("Drawing")}
            label={"Drawing"}
            selected={interests.includes("Drawing")}
          />
        </View>
      </View>
      <_Button
        text="Continue"
        action={() => navigator.navigate("HomeTabs")}
        color={disabled ? "primary1_030" : "primary1_100"}
        borderColor="primary1_100"
        textColor="white_100"
        style={STYLES.startButton}
        disabled={disabled}
      />
    </SafeAreaView>
  );
};

export default InterestsPage;
