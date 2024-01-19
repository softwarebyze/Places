import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  // Button: RNButton,
  ActivityIndicator,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import { SafeAreaView } from "react-native-safe-area-context";

import { PButton } from "./Button";
import { Input, Label } from "./Input";
import { Page, styles } from "./Page";
import _Dropdown from "./_Dropdown";
import { saveUserDetails } from "../../firebase/users";
import Colors from "../../settings/Colors";
import TERMS from "../../settings/Terms";
import { DetailsPageProps } from "../navigation/types";
import Styles from "../styles/Styles";

const terms = TERMS["English"];

const genders = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const Details = () => {
  const router = useRoute<DetailsPageProps["route"]>();
  // const { firstName: firstNameProp, lastName: lastNameProp } = router.params;
  useEffect(() => console.log(router.params), [router.params]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date(0));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const phoneRef = useRef();
  const [loading, setLoading] = useState(false);

  const completed = firstName.length && lastName.length && gender.length;
  const disabled = !completed;

  const onChangeDate: (event: DateTimePickerEvent, date?: Date) => void = (
    event,
    selectedDate,
  ) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

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
    <Page>
      <KeyboardAvoidingView style={{ ...styles.page, paddingHorizontal: 0 }}>
        <Input
          labelText="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <Input
          labelText="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <View>
          <Label labelText="Phone Number" />
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
          <Label labelText="Date of Birth" />
          <View
            style={[
              // Styles.d2Box,
              {
                flexDirection: "row",
                borderRadius: 10,
                borderColor: Colors.primary1_100,
                // justifyContent: "flex-start",
                // alignItems: "center",
                // padding: 12,
                // height: 70,
              },
            ]}
          >
            {/* Added platform code because there's a bug in Android 
          where the date picker won't hide */}
            {Platform.OS === "ios" ? (
              <DateTimePicker
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  padding: 0,
                  marginLeft: -10,
                }}
                value={dateOfBirth}
                onChange={onChangeDate}
              />
            ) : showDatePicker ? (
              <DateTimePicker value={dateOfBirth} onChange={onChangeDate} />
            ) : (
              <PButton
                text={dateOfBirth.toLocaleDateString()}
                action={() => setShowDatePicker(true)}
              />
            )}
          </View>
        </View>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <PButton
            text={terms["0017"]}
            action={handleSubmitDetails}
            disabled={disabled}
          />
        )}
      </KeyboardAvoidingView>
    </Page>
  );
};

export default Details;
