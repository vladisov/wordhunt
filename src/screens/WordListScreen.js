import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Context } from "../context/WordContext";
import { FontAwesome } from "@expo/vector-icons";

const WordListScreen = ({ route, navigation }) => {
  const { state, deleteWord } = useContext(Context);

  const { id } = route.params;
  const words = state.lists[id].words;

  navigation.setOptions({ title: `Active list: ${state.activeList}` });

  return (
    <View style={{ flex: 1 }}>
      {words ? (
        <FlatList
          style={{ flexGrow: 1 }}
          data={words}
          keyExtractor={({ from }) => from}
          renderItem={({ item }) => {
            return (
              <View style={styles.wordLayout}>
                <View
                  style={{
                    position: "absolute",
                    width: "80%",
                    zIndex: 1,
                    alignItems: "center",
                  }}
                >
                  <Text>
                    {item.from} - {item.to}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => deleteWord(id, item)}
                  >
                    <FontAwesome name="remove" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wordLayout: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    height: 40,
    alignItems: "center",
  },
  removeBtn: {
    marginLeft: "90%",
    alignSelf: "center",
  },
});

export default WordListScreen;
