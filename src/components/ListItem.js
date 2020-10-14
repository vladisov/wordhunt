import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ListItem = ({ item, state, selectList, openDetails }) => {
  return (
    <View style={styles.itemLayout}>
      <View style={styles.itemTextLayout}>
        <TouchableOpacity onPress={openDetails}>
          <Text style={styles.itemText}>{item}</Text>
        </TouchableOpacity>
      </View>
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
};

const styles = StyleSheet.create({
  iconLayout: {
    justifyContent: "center",
    flexWrap: "wrap",
    flex: 1,
    marginLeft: 30,
  },
  itemButton: {
    marginLeft: "90%",
    alignSelf: "center",
  },
  itemTextLayout: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    zIndex: 1,
    width: "85%",
    alignSelf: "center",
  },
  itemText: {
    alignSelf: "center",
    fontSize: 18,
    color: "black",
    fontWeight: "500",
  },
  itemLayout: {
    flexDirection: "row",
    height: 50,

    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 8,
    width: "90%",
    backgroundColor: "#fdedb5",

    shadowColor: "#b19d5c",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1.3,
    elevation: 8,
  },
});

export default ListItem;
