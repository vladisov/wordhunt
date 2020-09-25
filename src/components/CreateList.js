import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Context } from "../context/WordContext";

const CreateList = ({ isVisible, setVisible }) => {
  const { createList } = useContext(Context);
  const [name, setName] = useState("");

  const hide = () => {
    setVisible(false);
  };

  return (
    <View style={styles.layout}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => setName(text)}
              placeholder="Enter name..."
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  createList(name, hide);
                }}
              >
                <Text>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => hide()}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 2,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.84,
    elevation: 5,
    width: 250,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    width: 250,
    justifyContent: "space-around",
  },

  modalInput: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    borderRadius: 2,
    padding: 5,
  },
});

export default CreateList;
