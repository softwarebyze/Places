import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from 'expo-router'import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import PhoneInput from "react-native-phone-input";

import _Button from "@/elements/_Button";
import _Dropdown from "@/elements/_Dropdown";
import _Input from "@/elements/_Input";
import { db } from "@/firebaseConfig";
import Colors from "@/settings/Colors";
import TERMS from "@/settings/Terms";
import Styles from "@/styles/Styles";

const terms = TERMS["English"];

const Details = () => {
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

  const handleSubmitDetails = async () => {
    setLoading(true);
    const auth = getAuth();
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    await setDoc(
      userRef,
      {
        first_name: firstName,
        last_name: lastName,
        phone: phoneNumber,
        gender,
        details_completed: true,
        birth_date: dateOfBirth,
      },
      { merge: true },
    );
    router.navigate("ChooseLocation");
    setLoading(false);
  };

  const router = useRouter();
  return (
    <KeyboardAvoidingView style={[Styles.suliContinues, Styles.page]}>
      <_Input
        labelText="First Name"
        borderColor="primary1_100"
        onChangeText={setFirstName}
      />
      <_Input
        labelText="Last Name"
        borderColor="primary1_100"
        onChangeText={setLastName}
      />
      <View>
        <Text style={[Styles.d1Box, Styles.inputLabel]}>Phone Number</Text>
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
  );
};

export default Details;
