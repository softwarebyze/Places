import _Button from "./_Button";
import _Input from "./_Input";
import _Header from "./_Header";
import _Divider from "./_Divider";
import _Dropdown from "./_Dropdown";

import Styles from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-input";
import { Text, View } from "react-native";
import { useRef, useState } from "react";
import Colors from "../../../settings/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

const terms = TERMS["English"];

const Details = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
  };
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const [gender, setGender] = useState("");

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
      <_Dropdown
        label="Select an option"
        options={genders}
        labelText="Gender"
        onSelect={setGender}
      />

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
              justifyContent: "flex-start",
            },
          ]}
        >
          <DateTimePicker value={date} onChange={onChange} />
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
