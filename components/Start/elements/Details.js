import _Button from "./_Button";
import _Input from "./_Input";
import _Header from "./_Header";
import _Divider from "./_Divider";
import _Dropdown from "./_Dropdown";
import RadioForm from "react-native-simple-radio-button";

import Styles from "../styles/Styles";
import TERMS from "../../../settings/Terms";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";
import {
  Text,
  TouchableNativeFeedback,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useRef, useState } from "react";
import Colors from "../../../settings/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import Collapsible from "react-native-collapsible";

const terms = TERMS["English"];

const Details = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [chosenOption, setChosenOption] = useState("apple");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    setDate(currentDate);
  };
  const options = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [location, setLocation] = useState("");

  const disabled = location.length === 0;
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
      <View style={Styles.dropdownMargin}>
        <Pressable onPress={toggleDropdown}>
          <Text
            style={[
              Styles.dropdownHeader,
              !isCollapsed ? Styles.blueBorder : "",
              location.length > 0 ? Styles.blackText : "",
            ]}
          >
            Select an option
          </Text>
        </Pressable>
        <Collapsible collapsed={isCollapsed}>
          <View style={[Styles.blueBorder, Styles.backgroundWhite]}>
            <TouchableOpacity
              style={Styles.dropdownItem}
              onPress={() => {
                setLocation("New York City, USA");
                toggleDropdown();
              }}
            >
              <Text>New York City, USA</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.dropdownItem}
              onPress={() => {
                setLocation("Tel Aviv, Israel");
                toggleDropdown();
              }}
            >
              <Text>Tel Aviv, Israel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.dropdownItem}
              onPress={() => {
                setLocation("Herzilya, Israel");
                toggleDropdown();
              }}
            >
              <Text>Herzilya, Israel</Text>
            </TouchableOpacity>
          </View>
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
      <_Dropdown />
    </SafeAreaView>
  );
};

export default Details;
