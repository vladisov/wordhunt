import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import LangSelect from "../components/LangSelect";
import DictionaryTranslation from "../components/DictionaryTranslation";
import useTranslation from "../hooks/useTranslation";
import { Context } from "../context/WordContext";
import { MaterialIcons } from "@expo/vector-icons";

const TranslateScreen = ({ initialValues, navigation }) => {
  const [word, setWord] = useState("");
  const [
    getTranslation,
    getDictionaryTranslation,
    dictionaryTranslation,
    errorMessage,
  ] = useTranslation();
  const [langFrom, setLangFrom] = useState(initialValues.langFrom);
  const [langTo, setLangTo] = useState(initialValues.langTo);
  const { state, addWord } = useContext(Context);
  const [activeTranslation, setActiveTranslation] = useState(false);

  navigation.setOptions({
    title: `ACTIVE LIST: ${state.activeList.toUpperCase()}`,
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      cleanValues();
    });

    return unsubscribe;
  }, [navigation]);

  const isArrow = () => {
    return !activeTranslation;
  };

  const cleanValues = () => {
    setWord("");
    setActiveTranslation(false);
    getTranslation("", langFrom.value, langTo.value, addWord); //todo fix
  };

  // const old = (
  //     <View>
  //       <LangSelect
  //         langFrom={langFrom}
  //         langTo={langTo}
  //         onFromLanguageChange={(langFrom) => setLangFrom(langFrom)}
  //         onToLanguageChange={(langTo) => setLangTo(langTo)}
  //       />
  //     </View>
  // );

  return (
    <View style={styles.layout}>
      <View style={{ height: 120, width: "100%" }}>
        <TextInput
          selectionColor="black"
          value={word}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(text) => {
            console.log("on change " + text);
            getTranslation(text, langFrom.value, langTo.value, addWord);
            setWord(text);
            setActiveTranslation(false);
          }}
        />
        <View style={styles.arrow}>
          {isArrow() ? (
            <TouchableOpacity
              onPress={() => {
                {
                  // getTranslation(word, langFrom.value, langTo.value, addWord);
                  getDictionaryTranslation(
                    word,
                    langFrom.value,
                    langTo.value,
                    addWord
                  );
                  setActiveTranslation(true);
                }
              }}
            >
              <MaterialIcons name="navigate-next" size={46} color="#4c4c4c" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={cleanValues}>
              <MaterialIcons name="close" size={46} color="#4c4c4c" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {Object.keys(dictionaryTranslation).length > 0 ? (
        <View style={styles.output}>
          <DictionaryTranslation translation={dictionaryTranslation} />
          <Text autoCapitalize="none" style={styles.outputText}></Text>
        </View>
      ) : (
        <View style={styles.emptyView}></View>
      )}

      <View style={styles.wordList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={state.lists[state.activeList].words}
          keyExtractor={({ from }) => {
            return from;
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.wordItem}>
                <Text style={common.text}>{item.from}</Text>
                <Text>{item.to}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

TranslateScreen.defaultProps = {
  initialValues: {
    langFrom: {
      value: "en",
      label: "English",
    },
    langTo: {
      value: "ru",
      label: "Russian",
    },
  },
};

const common = StyleSheet.create({
  baseCard: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 4,
    borderWidth: 0.1,
    borderColor: "black",
    borderRadius: 20,
    color: "black",
  },
  text: {
    color: "black",
    fontSize: 18,
    fontWeight: "500",
  },
});
const styles = StyleSheet.create({
  layout: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#FDE184",
  },
  emptyView: {
    height: 10,
  },
  input: {
    paddingLeft: 10,
    paddingTop: 30,
    flex: 1,
    fontSize: 36,
    color: "black",
    width: "100%",
    height: "100%",
    fontWeight: "600",
    backgroundColor: "#FDE184",
  },
  arrow: {
    position: "absolute",
    right: 15,
    top: 33,
  },
  output: {
    padding: 20,
    marginTop: 15,
    marginBottom: 10,
    minHeight: 100,
    width: "90%",
    alignSelf: "center",
    ...common.baseCard,
  },
  outputText: {
    fontSize: 18,
    fontWeight: "500",
  },
  wordList: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: "#e3ca76",
    borderBottomColor: "#e3ca76",
    marginBottom: 2,
    alignSelf: "center",
    borderRadius: 2,
    flex: 1,
    width: "97%",
  },
  wordItem: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 4,
    padding: 15,
    width: "97%",
    backgroundColor: "#fdedb5",

    shadowColor: "#b19d5c",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.3,
    elevation: 4,
  },
});

export default TranslateScreen;
