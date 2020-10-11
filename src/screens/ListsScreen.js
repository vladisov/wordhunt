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
    justifyContent: "center",
    marginTop: 10,
    flex: 1,
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
  newList: {
    alignSelf: "center",
  },
  list: {
    // flex: 1,
  },
});

export default ListsScreen;
