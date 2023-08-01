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
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { useRef, useState } from "react";
import Colors from "../../../settings/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native";

const terms = TERMS["English"];

const Details = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(0));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const phoneRef = useRef();

  const completed = firstName.length && lastName.length && gender.length;
  const disabled = !completed;

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const navigator = useNavigation();
  return (
    <SafeAreaView style={[Styles.suliContinues, Styles.page]}>
      <KeyboardAvoidingView>
        <_Input
          labelText={"First Name"}
          borderColor={"primary1_100"}
          style={Styles.signUpInput}
          onChangeText={setFirstName}
        />
        <_Input
          labelText={"Last Name"}
          borderColor={"primary1_100"}
          style={Styles.signUpInput}
          onChangeText={setLastName}
        />
        <View style={Styles.signUpInput}>
          <Text style={[Styles.d1Box, Styles.inputLabel]}>
            {"Phone Number"}
          </Text>
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
              initialCountry="us"
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
          <Text style={[Styles.d1Box, Styles.inputLabel]}>
            {"Date of Birth"}
          </Text>
          <View
            style={[
              Styles.d2Box,
              {
                flexDirection: "row",
                borderRadius: 10,
                fontSize: 17,
                borderColor: Colors.primary1_100,
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 12,
                height: 70,
              },
            ]}
          >
            {/* Added platform code because there's a bug in Android 
          where the date picker won't hide */}
            {Platform.OS === "ios" ? (
              <DateTimePicker value={dateOfBirth} onChange={onChangeDate} />
            ) : showDatePicker ? (
              <DateTimePicker value={dateOfBirth} onChange={onChangeDate} />
            ) : (
              <Button
                title={dateOfBirth.toLocaleDateString()}
                onPress={() => setShowDatePicker(true)}
              />
            )}
          </View>
        </View>
        <_Button
          text={terms["0017"]}
          action={() => navigator.navigate("ChooseLocation")}
          color={disabled ? "primary1_030" : "primary1_100"}
          borderColor={disabled ? "light_grey" : "primary1_100"}
          textColor="white_100"
          underline={false}
          disabled={disabled}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Details;
