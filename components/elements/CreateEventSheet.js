import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { Button, View, Text } from "react-native";
import SheetHeader from "./SheetHeader";
import _Input from "./_Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import _Button from "./_Button";
import Styles from "../styles/Styles";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "../../settings/Colors";

const CreateEventSheet = () => {
  const createEventBottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const headerText = "Details";
  const [dateOfEvent, setDateOfEvent] = useState(new Date());
  const [timeOfEvent, setTimeOfEvent] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const GooglePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
          language: "en",
        }}
      />
    );
  };

  const onChangeDateOfEvent = (eventDate, selectedDate) => {
    const currentDate = selectedDate || dateOfEvent;
    setShowDate(false);
    setDateOfEvent(currentDate);
  };
  const onChangeTimeOfEvent = (eventTime, selectedTime) => {
    const currentTime = selectedTime || timeOfEvent;
    setShowTime(false);
    setTimeOfEvent(currentTime);
  };
  return (
    <BottomSheet
      ref={createEventBottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
    >
      <View style={[Styles.page, { gap: 10 }]}>
        <SheetHeader sheetHeaderText={headerText} />

        <_Input
          labelText="Event Name"
          borderColor="primary1_100"
          placeholder="Event name"
          placeholderTextColor="primary1_030"
        />
        <_Input
          labelText="Location"
          borderColor="primary1_100"
          placeholder="Location"
          placeholderTextColor="primary1_030"
        />

        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.signUpInput}>
              <Text style={[Styles.inputLabel]}>{"Date"}</Text>
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
                    height: 35,
                    width: 160,
                  },
                ]}
              >
                {/* Added platform code because there's a bug in Android 
          where the date picker won't hide */}
                {Platform.OS === "ios" ? (
                  <DateTimePicker
                    value={dateOfEvent}
                    onChange={onChangeDateOfEvent}
                  />
                ) : showDatePicker ? (
                  <DateTimePicker
                    value={dateOfEvent}
                    onChange={onChangeDateOfEvent}
                  />
                ) : (
                  <Button
                    title={dateOfEvent.toLocaleDateString()}
                    onPress={() => setShowDate(true)}
                  />
                )}
              </View>
            </View>

            <View style={Styles.signUpInput}>
              <Text style={[Styles.inputLabel]}>{"Time"}</Text>
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
                    height: 35,
                    width: 160,
                  },
                ]}
              >
                {/* Added platform code because there's a bug in Android 
          where the date picker won't hide */}
                {Platform.OS === "ios" ? (
                  <DateTimePicker
                    value={timeOfEvent}
                    onChange={onChangeTimeOfEvent}
                  />
                ) : showDatePicker ? (
                  <DateTimePicker
                    value={timeOfEvent}
                    onChange={onChangeTimeOfEvent}
                  />
                ) : (
                  <Button
                    title={timeOfEvent.toLocaleDateString()}
                    onPress={() => setShowTime(true)}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        <_Input
          labelText="Tags"
          borderColor="primary1_100"
          placeholder="Tags"
          placeholderTextColor="primary1_030"
        />
        <_Input
          labelText="Description"
          borderColor="primary1_100"
          placeholder="Description"
          placeholderTextColor="primary1_030"
          subtextText="0/100"
          subtextColor="primary1_030"
          subtextAlignSelf="flex-end"
        />
        <_Button text="Create Event" />
        <_Button text="Cancel" type="secondary" />
      </View>
    </BottomSheet>
  );
};

export default CreateEventSheet;
