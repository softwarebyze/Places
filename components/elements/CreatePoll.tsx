import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Switch,
  //   DatePickerIOS,
  //   TimePickerAndroid,
  Alert,
  SafeAreaView,
} from "react-native";

const CreatePoll = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [pollOptions, setPollOptions] = useState([""]);
  const [allowMultipleSelection, setAllowMultipleSelection] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [expirationDate, setExpirationDate] = useState(new Date());

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const addOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  const handleCreatePoll = () => {
    // Implement functionality to create the poll (e.g., send API request)
    // Include pollTitle, pollOptions, allowMultipleSelection, isAnonymous, expirationDate, etc.
    Alert.alert("Poll created successfully!");
    toggleModal();
  };

  const handleVote = (optionIndex) => {
    // Implement functionality to record user's vote for the selected option
    // Track votes for each option
    Alert.alert(`You voted for option ${optionIndex + 1}`);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={toggleModal}>
        <Text>Create Poll</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <View>
            <TextInput
              placeholder="Poll Title"
              onChangeText={setPollTitle}
              value={pollTitle}
              style={{ fontSize: 18, fontWeight: "bold", color: "black" }}
            />

            {pollOptions.map((option, index) => (
              <TextInput
                key={index.toString()}
                placeholder={`Option ${index + 1}`}
                onChangeText={(text) => handleOptionChange(index, text)}
                value={option}
                style={{ fontSize: 16, marginTop: 10 }}
              />
            ))}

            <TouchableOpacity onPress={addOption}>
              <Text>Add Option</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text>Allow Multiple Selection:</Text>
              <Switch
                value={allowMultipleSelection}
                onValueChange={(value) => setAllowMultipleSelection(value)}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <Text>Anonymous Poll:</Text>
              <Switch
                value={isAnonymous}
                onValueChange={(value) => setIsAnonymous(value)}
              />
            </View>

            {/* <DatePickerIOS
              date={expirationDate}
              onDateChange={setExpirationDate}
              mode="datetime"
              style={{ marginTop: 20 }}
            /> */}

            <TouchableOpacity
              onPress={handleCreatePoll}
              style={{ marginTop: 20 }}
            >
              <Text>Create Poll</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={{ marginTop: 20 }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default CreatePoll;
