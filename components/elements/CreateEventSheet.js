import { AntDesign } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useMemo, useRef, useState } from "react";
import { Button, View, Text, Platform } from "react-native";
import SheetHeader from "./SheetHeader";
import _Button from "./_Button";
import _Input from "./_Input";
import Styles from "../styles/Styles";
import Colors from "../../settings/Colors";

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
      <View style={Styles.page}>
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
        <View
          style={{
            gap: 15,
            flexDirection: "row",
          }}
        >
          <View>
            <View>
              <View style={Styles.signUpInput}>
                <Text style={[Styles.inputLabel]}>"Date"</Text>
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
            </View>
          </View>
          <View>
            <View style={Styles.signUpInput}>
              <Text style={[Styles.inputLabel]}>"Time"</Text>
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
        </View>

        <_Input
          labelText="Description"
          borderColor="primary1_100"
          placeholder="Description"
          placeholderTextColor="primary1_030"
          subtextText="0/100"
          subtextColor="primary1_030"
          subtextAlignSelf="flex-end"
          style={{ marginTop: 30 }}
        />
        <View style={{ marginTop: 60 }}>
          <_Button text="Create Event" />
          <_Button text="Cancel" type="secondary" style={{ marginTop: 15 }} />
        </View>
      </View>
    </BottomSheet>
  );
};

export default CreateEventSheet;
