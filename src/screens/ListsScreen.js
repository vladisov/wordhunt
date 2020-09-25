import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Context } from "../context/WordContext";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import CreateList from "../components/CreateList";

const ListsScreen = ({ navigation }) => {
  const { state, selectList } = useContext(Context);
  const [modalVisible, setModalVisible] = useState(false);

  const listNames = Object.keys(state.lists);

  navigation.setOptions({ title: `Active list: ${state.activeList}` });

  return (
    <View style={styles.layout}>
      <View style={styles.newListLayout}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.newList}>Create new</Text>
        </TouchableOpacity>
      </View>
      <CreateList isVisible={modalVisible} setVisible={setModalVisible} />

      <FlatList
        data={listNames}
        keyExtractor={(name) => {
          return name;
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemLayout}>
              <Text style={styles.itemText}>{item}</Text>
              {state.activeList === item ? (
                <View style={styles.iconLayout}>
                  <TouchableOpacity style={styles.itemButton}>
                    <AntDesign name="heart" size={19} color="black" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.iconLayout}>
                  <TouchableOpacity
                    style={styles.itemButton}
                    onPress={() => selectList(item)}
                  >
                    <AntDesign name="hearto" size={18} color="black" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    justifyContent: "center",
    marginTop: 10,
  },
  newListLayout: {
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "gray",
    width: 300,
    height: 40,
    borderRadius: 2,
    margin: 5,
    borderStyle: "dashed",
  },
  itemLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    width: 300,
    height: 40,
    borderRadius: 2,
    margin: 5,
  },
  itemText: {
    alignSelf: "center",
  },
  newList: {
    alignSelf: "center",
  },
  iconLayout: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    marginLeft: 300,
  },
  itemButton: {
    marginLeft: 260,
  },
});

export default ListsScreen;
