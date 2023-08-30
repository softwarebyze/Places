import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { Button, View, StyleSheet } from "react-native";
import SheetHeader from "./SheetHeader";
import _Input from "./_Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import _Button from "./_Button";
import Styles from "../styles/Styles";

const CreateEventSheet = () => {
  const createEventBottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const headerText = "Details";
  const [dateOfEvent, setDateOfEvent] = useState(new Date());
  const [timeOfEvent, setTimeOfEvent] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

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

        <_Input labelText="Event Name" />
        <_Input labelText="Location" />

        <View style={{ flexDirection: "row" }}>
          {showDate ? (
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
          {showTime ? (
            <DateTimePicker
              mode="time"
              value={timeOfEvent}
              onChange={onChangeTimeOfEvent}
            />
          ) : (
            <Button
              title={timeOfEvent.toLocaleTimeString()}
              onPress={() => setShowTime(true)}
            />
          )}
        </View>
        <_Input labelText="Tags" />
        <_Input labelText="Description" />
        <_Button text="Create Event" />
        <_Button text="Cancel" type="secondary" />
      </View>
    </BottomSheet>
  );
};

export default CreateEventSheet;
