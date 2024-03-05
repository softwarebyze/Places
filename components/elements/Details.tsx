import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import { SafeAreaView } from "react-native-safe-area-context";

import _Button from "./_Button";
import _Dropdown from "./_Dropdown";
import _Input from "./_Input";
import { saveUserDetails } from "../../firebase/users";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import { DetailsPageProps } from "../navigation/types";
import Styles from "../styles/Styles";

const terms = TERMS["English"];

const Details = () => {
  const router = useRoute<DetailsPageProps["route"]>();
  const { firstName: firstNameProp, lastName: lastNameProp } =
    router.params || {
      firstName: "",
      lastName: "",
    };

  const [firstName, setFirstName] = useState(firstNameProp);
  const [lastName, setLastName] = useState(lastNameProp);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(0));
  // const [showDatePicker, setShowDatePicker] = useState(false);
  const phoneRef = useRef();
  const [loading, setLoading] = useState(false);

  const completed = firstName.length && lastName.length && gender.length;
  const disabled = !completed;

  // const onChangeDate = (event, selectedDate) => {
  //   const currentDate = selectedDate || dateOfBirth;
  //   setShowDatePicker(false);
  //   setDateOfBirth(currentDate);
  // };

  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  const handleSubmitDetails = async () => {
    setLoading(true);
    await saveUserDetails({
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
      gender,
      birth_date: dateOfBirth,
      details_completed: true,
    });
    navigator.navigate("ChooseLocation");
    setLoading(false);
  };

  const navigator = useNavigation();
  return (
    <SafeAreaView style={Styles.page}>
      <KeyboardAvoidingView style={[Styles.suliContinues, Styles.page]}>
        <_Input
          labelText="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <_Input
          labelText="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <View>
          <Text style={Styles.inputLabel}>Phone Number</Text>
          <View
            style={[
              Styles.d2Box,
              {
                borderRadius: 10,
                padding: 10,
                borderColor: Colors.primary1_100,
                justifyContent: "center",
              },
            ]}
          >
            <PhoneInput
              initialCountry="us"
              ref={phoneRef}
              onChangePhoneNumber={setPhoneNumber}
              autoFormat
              textProps={{
                enterKeyHint: "done",
              }}
            />
          </View>
        </View>
        <_Dropdown
          label="Select an option"
          options={genders}
          labelText="Gender"
          onSelect={setGender}
        />
        <View>
          <Text style={[Styles.inputLabel]}>Date of Birth</Text>
          <View
            style={[
              Styles.d2Box,
              {
                flexDirection: "row",
                borderRadius: 10,
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
            {/* {Platform.OS === "ios" ? (
              <DateTimePicker value={dateOfBirth} onChange={onChangeDate} />
            ) : showDatePicker ? (
              <DateTimePicker value={dateOfBirth} onChange={onChangeDate} />
            ) : (
              <Button
                title={dateOfBirth.toLocaleDateString()}
                onPress={() => setShowDatePicker(true)}
              />
            )} */}
            {/* just a text input for birth date */}
            <TextInput
              value={dateOfBirth.toLocaleDateString()}
              // onChangeText={() => setShowDatePicker(true)}
              // disabled
            />
          </View>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <_Button
            text={terms["0017"]}
            action={handleSubmitDetails}
            disabled={disabled}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Details;
