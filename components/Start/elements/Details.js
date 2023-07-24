import _Button from "./_Button";
import _Input from "./_Input";
import _Header from "./_Header";
import _Divider from "./_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-input";
import { Text, View } from "react-native";
import { useRef, useState } from "react";
import Colors from "../../../settings/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Collapsible from "react-native-collapsible";
import DropdownItem from "react-native-collapsible";
import Ionicons from "react-native-collapsible";
import TouchableOpacity from "react-native-collapsible";
import SomeCollapsedView from "react-native-collapsible";
// import _Button from “./_Button”;
// import _Input from “./_Input”;
// import _Header from “./_Header”;
// import _Divider from “./_Divider”;
// import STYLES from “../styles/Styles”;
// import TERMS from “../../../settings/Terms”;
// import { useNavigation } from “@react-navigation/native”;
// import { SafeAreaView } from “react-native-safe-area-context”;
// import PhoneInput from “react-native-phone-input”;
// //import CountryPicker from “react-native-country-picker-modal”
// import React, { useState } from “react”;
//  import DateTimePicker from “@react-native-community/datetimepicker”;
// import { StyleSheet, Text, View } from “react-native”;
//  import { Picker } from “@react-native-picker/picker”;
const terms = TERMS["English"];

const Details = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showMode("time");
  };
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleDropdown = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigator = useNavigation();
  const phoneRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <SafeAreaView style={[STYLES.suliContinues, STYLES.page]}>
      <_Input
        labelText={"First Name"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Last Name"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <View style={STYLES.signUpInput}>
        <Text style={[STYLES.d1Box, STYLES.inputLabel]}>{"Phone Number"}</Text>
        <View
          style={[
            STYLES.d2Box,
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
      <Collapsible collapsed={isCollapsed}>
        <SomeCollapsedView />
      </Collapsible>
      //GENDER PICKER GOES HERE!!!!!
      <View style={STYLES.signUpInput}>
        <Text style={[STYLES.d1Box, STYLES.inputLabel]}>{"Phone Number"}</Text>
        <View
          style={[
            STYLES.d2Box,
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
      <View style={STYLES.signUpInput}>
        <Text style={[STYLES.d1Box, STYLES.inputLabel]}>{"Date of Birth"}</Text>
        <View
          style={[
            STYLES.d2Box,
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
      {/* <_Input
        labelText={"Gender"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Date of Birth"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      /> */}
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
