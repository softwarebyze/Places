import _Button from "./_Button";
import _Input from "./_Input";
import _Header from "./_Header";
import _Divider from "./_Divider";

import Styles from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";
import { Text, View, TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import Colors from "../../../settings/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Collapsible from "react-native-collapsible";
import { useChatContext } from "stream-chat-expo";
import { getAuth } from "firebase/auth";

const terms = TERMS["English"];

const Details = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");

  const { client } = useChatContext();

  const getTokenAndConnectUser = async (userInfo) => {
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const res = await fetch(
      `https://auth-token.onrender.com/?user_id=${userId}`,
    );
    const { token } = await res.json();
    console.log("adding", { id: userId, ...userInfo });
    await client.connectUser({ id: userId, ...userInfo }, token);
    // await client.upsertUser({ id: userId, ...userInfo });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigator = useNavigation();
  const phoneRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleSubmit = async () => {
    const user = {
      firstName,
      lastName,
      phoneNumber,
      gender,
      date,
    };
    await getTokenAndConnectUser(user);
    console.log("here");
    navigator.navigate("ChooseLocation");
  };
  return (
    <SafeAreaView style={[Styles.suliContinues, Styles.page]}>
      <Text>
        {JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          gender,
          date,
        })}
      </Text>
      <_Input
        labelText={"First Name"}
        borderColor={"primary1_100"}
        style={Styles.signUpInput}
        onChangeText={(input) => setFirstName(input)}
      />
      <_Input
        labelText={"Last Name"}
        borderColor={"primary1_100"}
        style={Styles.signUpInput}
        onChangeText={(input) => setLastName(input)}
      />
      <View style={Styles.signUpInput}>
        <Text style={[Styles.d1Box, Styles.inputLabel]}>{"Phone Number"}</Text>
        <View
          style={[
            Styles.d2Box,
            {
              borderRadius: 10,
              padding: 10,
              fontSize: 17,
              borderColor: Colors.primary1_100,
              justifyContent: "center",
            },
          ]}
        >
          <PhoneInput
            initialCountry={"us"}
            ref={phoneRef}
            onChangePhoneNumber={setPhoneNumber}
          />
        </View>
      </View>
      <View style={Styles.signUpInput}>
        <Text style={[Styles.d1Box, Styles.inputLabel]}>{"Gender"}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary1_100,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 95,
            paddingVertical: 12,
            borderRadius: 10,
          }}
          onPress={toggleDropdown}
        >
          <Text
            style={[
              Styles.whiteText,
              Styles.blueDropdownHeader,
              { fontWeight: "bold" },
            ]}
          >
            Select an option
          </Text>
          {isCollapsed ? (
            <Ionicons name="chevron-down-outline" size={24} color="white" />
          ) : (
            <Ionicons name="chevron-up-outline" size={24} color="white" />
          )}
        </TouchableOpacity>
        <Collapsible
          align="bottom"
          collapsed={isCollapsed}
          containerStyle={{ borderRadius: 0 }}
        >
          <Text
            onPress={() => setGender("Male")}
            style={Styles.blueDropdownText}
          >
            Male
          </Text>
          <Text
            onPress={() => setGender("Female")}
            style={Styles.blueDropdownText}
          >
            Female
          </Text>
        </Collapsible>
      </View>
      <View style={Styles.signUpInput}>
        <Text style={[Styles.d1Box, Styles.inputLabel]}>{"Date of Birth"}</Text>
        <View
          style={[
            Styles.d2Box,
            {
              borderRadius: 10,
              padding: 10,
              fontSize: 17,
              borderColor: Colors.primary1_100,
              justifyContent: "center",
            },
          ]}
        >
          <DateTimePicker
            testID="datepicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        </View>
      </View>

      <_Button
        text={terms["0017"]}
        action={handleSubmit}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={false}
      />
    </SafeAreaView>
  );
};

export default Details;
