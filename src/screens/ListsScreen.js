import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Context } from "../context/WordContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import CreateList from "../components/CreateList";
import ListItem from "../components/ListItem";

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
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(name) => {
          return name;
        }}
        style={styles.list}
        renderItem={({ item }) => {
          return (
            <ListItem
              item={item}
              state={state}
              selectList={selectList}
              openDetails={() => navigation.navigate("WordsList", { id: item })}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    alignItems: "center",
    backgroundColor: "#FDE184",
    justifyContent: "center",
    flex: 1,
  },
  newListLayout: {
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    width: "90%",
    height: 50,
    marginTop: 15,
    marginBottom: 10,
    borderStyle: "dashed",
  },
  newList: {
    alignSelf: "center",
    fontSize: 16,
    color: "black",
  },
  list: {
    width: "100%",
  },
});

export default ListsScreen;
