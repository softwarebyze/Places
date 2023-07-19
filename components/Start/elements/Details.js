import _Button from "./_Button";
import _Input from "./_Input";
import _Header from "./_Header";
import _Divider from "./_Divider";
import STYLES from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import PhoneInput from "react-native-phone-input";
//import CountryPicker from "react-native-country-picker-modal"
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
const onPressFlag = () => {
  this.countryPicker.openModal();
};

const selectCountry = (country) => {
  this.phone.selectCountry(country.cca2.toLowerCase());
  this.setState({ cca2: country.cca2 });
};

// Updates the Flag on change
onPhoneInputChange = (value, iso2) => {
  newState = {
    phoneInputValue: value,
  };

  if (iso2) {
    newState.countryCode = iso2?.toUpperCase();
  }

  this.setState(newState);
};

const terms = TERMS["English"];

const Details = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const navigator = useNavigation();
  return (
    <SafeAreaView style={STYLES.suliContinues}>
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

      <Text style={STYLES.signUpInput}>{terms["0035"]}</Text>

      <PhoneInput
        ref={(ref) => {
          this.phone = ref;
        }}
        onPressFlag={this.onPressFlag}
        initialCountry={"us"}
        initialValue="13178675309"
        onChangePhoneNumber={this.onPhoneInputChange}
        textProps={{
          placeholder: "Enter a phone number...",
        }}
      />

      {/* <_Input
        labelText={"Phone Number"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      /> */}
      <_Input
        labelText={"Gender"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />

      <SafeAreaView>
        <_Button onPress={showDatepicker} title="Show date picker!" />
        <_Button onPress={showTimepicker} title="Show time picker!" />
        <Text>selected: {date.toLocaleString()}</Text>
      </SafeAreaView>

      {/* <_Input
        labelText={"Date of Birth"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      /> */}
      {/* <_Input
        labelText={"Password"}
        borderColor={"primary1_100"}
        style={STYLES.signUpInput}
      />
      <_Input
        labelText={"Confirm Password"}
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
