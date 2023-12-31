import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Button, View, Text, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import SheetHeader from "./SheetHeader";
import _Button from "./_Button";
import _Input from "./_Input";
import Colors from "../../settings/Colors";
import Styles from "../styles/Styles";

const GooglePlacesInput = (props) => {
  return (
    <GooglePlacesAutocomplete
      styles={{
        listView: {
          marginTop: 40, // keeps the results from overlapping the input
        },
      }}
      placeholder="Location"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        props.onPress(data, details);
      }}
      query={{
        key: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
        language: "en",
      }}
      // currentLocation // requires setup, then adds 'Current location' button at the top of the places list
      textInputProps={{
        InputComp: _Input,
        labelText: "Location",
        borderColor: "primary1_100",
        placeholderTextColor: "primary1_030",
      }}
    />
  );
};

const CreateEventSheet = (props) => {
  const headerText = "Details";
  const [dateOfEvent, setDateOfEvent] = useState(new Date());
  const [timeOfEvent, setTimeOfEvent] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [eventState, setEventState] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const event = {
    title: eventName,
    address: eventLocation,
    date: dateOfEvent,
    time: timeOfEvent,
    city: eventCity,
    state: eventState,
    description: eventDescription,
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

  const onPressLocation = (data, details = null) => {
    console.log({ data, details });
    setEventLocation(data.description);
    setEventCity(data.terms[2]);
    setEventState(data.terms[3]);
  };

  const handleCreateEvent = () => {
    console.log("handleCreateEvent");
    console.log(event);
    props.onClose();
  };

  return (
    <View style={[Styles.page, { gap: 15 }]}>
      <SheetHeader sheetHeaderText={headerText} />
      <_Input
        labelText="Event Name"
        placeholder="Event name"
        onChangeText={setEventName}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 30,
        }}
      >
        <GooglePlacesInput onPress={onPressLocation} />
      </View>
      <View
        style={{
          gap: 15,
          flexDirection: "row",
        }}
      >
        <View>
          <Text style={[Styles.inputLabel]}>Date</Text>
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
                height: 50,
                width: 160,
              },
            ]}
          >
            <AntDesign
              name="calendar"
              size={18}
              style={{
                color: Colors.primary1_100,
              }}
            />
            {/* Added platform code because there's a bug in Android 
          where the date picker won't hide */}
            {Platform.OS === "ios" ? (
              <DateTimePicker
                value={dateOfEvent}
                onChange={onChangeDateOfEvent}
              />
            ) : showDate ? (
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
        <View>
          <Text style={[Styles.inputLabel]}>Time</Text>
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
                height: 50,
                width: 160,
              },
            ]}
          >
            <AntDesign
              name="clockcircleo"
              size={18}
              style={{
                color: Colors.primary1_100,
              }}
            />
            {/* Added platform code because there's a bug in Android 
          where the date picker won't hide */}
            {Platform.OS === "ios" ? (
              <DateTimePicker
                mode="time"
                value={timeOfEvent}
                onChange={onChangeTimeOfEvent}
              />
            ) : showTime ? (
              <DateTimePicker
                mode="time"
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

      <_Input
        labelText="Description"
        placeholder="Description"
        subtextText={`${eventDescription.length}/100`}
        onChangeText={setEventDescription}
      />
      <_Button text="Create Event" action={handleCreateEvent} />
      <_Button text="Cancel" type="secondary" />
    </View>
  );
};

export default CreateEventSheet;
