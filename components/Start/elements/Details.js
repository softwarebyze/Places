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

const terms = TERMS["English"];

const Details = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };
  const navigator = useNavigation();
  const phoneRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <SafeAreaView style={[Styles.suliContinues, Styles.page]}>
      <_Input
        labelText={"First Name"}
        borderColor={"primary1_100"}
        style={Styles.signUpInput}
      />
      <_Input
        labelText={"Last Name"}
        borderColor={"primary1_100"}
        style={Styles.signUpInput}
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
          <Text>M</Text>
          <Text>F</Text>
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
        action={() => navigator.navigate("ChooseLocation")}
        color="primary1_100"
        borderColor="primary1_030"
        textColor="white_100"
        underline={false}
      />
    </SafeAreaView>
  );
};

export default Details;
