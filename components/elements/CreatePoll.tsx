import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Switch,
  Alert,
  StyleSheet,
} from "react-native";

const CreatePoll = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pollTitle, setPollTitle] = useState("");
  const [pollOptions, setPollOptions] = useState([""]);

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
    // Implement functionality to create the poll
    Alert.alert("Poll created successfully!");
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.createPollButton}>Create Poll</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          <Text style={styles.title}>Create Poll</Text>

          <TextInput
            placeholder="Poll Title"
            onChangeText={setPollTitle}
            value={pollTitle}
            style={[styles.input, styles.titleInput]}
          />

          {pollOptions.map((option, index) => (
            <TextInput
              key={index.toString()}
              placeholder={`Option ${index + 1}`}
              onChangeText={(text) => handleOptionChange(index, text)}
              value={option}
              style={styles.input}
            />
          ))}

          <TouchableOpacity onPress={addOption} style={styles.addOptionButton}>
            <Text style={styles.addOptionText}>+ Add Option</Text>
          </TouchableOpacity>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Allow Multiple Selection:</Text>
            <Switch style={styles.switchInput} />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Anonymous Poll:</Text>
            <Switch style={styles.switchInput} />
          </View>

          <TouchableOpacity
            onPress={handleCreatePoll}
            style={styles.createButton}
          >
            <Text style={styles.createButtonText}>Create Poll</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createPollButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  titleInput: {
    width: "90%",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "90%",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    color: "#333",
  },
  addOptionButton: {
    alignSelf: "flex-start",
    backgroundColor: "#4287f5",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 15,
  },
  addOptionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    fontSize: 16,
    marginRight: 10,
    color: "#333",
  },
  switchInput: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  createButton: {
    backgroundColor: "#34c759",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    width: "70%",
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 20,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#4287f5",
  },
});

export default CreatePoll;
