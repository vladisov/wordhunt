import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../context/WordContext";

const getRandom = (state) => {
  const { words } = state.lists[state.activeList];
  if (!words) return "";
  const randomId = Math.floor(Math.random() * words.length);
  return words[randomId];
};

const RepeatScreen = ({ navigation }) => {
  const { state } = useContext(Context);
  const [random, setRandom] = useState(null);
  const [repeated, setRepeated] = useState(false);

  navigation.setOptions({ title: `Active list: ${state.activeList}` });

  useEffect(() => {
    setRandom(getRandom(state));
  }, []);

  return (
    <View style={styles.layout}>
      {random ? (
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setRepeated(!repeated);
            }}
          >
            <Text style={styles.text}>
              {!repeated ? random.from : random.to}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.buttonView}>
        <TouchableOpacity onPress={() => setRandom(getRandom(state))}>
          <Text style={styles.buttonText}>GENERATE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: "20%",
    backgroundColor: "#fff",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.3,
    elevation: 4,
    flex: 3,
    height: "20%",
    width: "85%",

  },
  layout: {
    backgroundColor: "#FDE184",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
  buttonView: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    borderColor: "#b19d5c",
    width: "85%",
    height: 30,

    borderRadius: 3,
    // backgroundColor: "#fdedb5",
  },
  buttonText: {
    fontWeight: "500",
    fontSize: 18,
  },
});

export default RepeatScreen;
