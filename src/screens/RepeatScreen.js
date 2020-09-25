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
      <Button title="Generate" onPress={() => setRandom(getRandom(state))} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 3,
    width: "80%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  layout: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RepeatScreen;
