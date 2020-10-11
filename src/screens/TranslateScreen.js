import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import LangSelect from "../components/LangSelect";
import useTranslation from "../hooks/useTranslation";
import { Context } from "../context/WordContext";
import { LinearGradient } from "expo-linear-gradient";

const TranslateScreen = ({ initialValues, navigation }) => {
  const [word, setWord] = useState("");
  const [
    getTranslation,
    translation,
    setTranslation,
    errorMessage,
  ] = useTranslation();
  const [langFrom, setLangFrom] = useState(initialValues.langFrom);
  const [langTo, setLangTo] = useState(initialValues.langTo);
  const { state, addWord } = useContext(Context);

  navigation.setOptions({ title: `Active list: ${state.activeList}` });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setWord("");
      setTranslation("");
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.layout}>
      <View>
        <LangSelect
          langFrom={langFrom}
          langTo={langTo}
          onFromLanguageChange={(langFrom) => setLangFrom(langFrom)}
          onToLanguageChange={(langTo) => setLangTo(langTo)}
        />
      </View>
      <View>
        <TextInput
          value={word}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(text) => {
            setWord(text);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          getTranslation(word, langFrom.value, langTo.value, addWord);
        }}
        style={styles.buttonContainer}
      >
        <Text style={styles.button}>Translate</Text>
      </TouchableOpacity>
      {/* <Button style={styles.button} title="Translate" /> */}
      <View>
        <Text autoCapitalize="none" style={styles.output}>
          {translation ? translation.toLocaleLowerCase() : null}
        </Text>
      </View>
      <View>{errorMessage ? <Text>{errorMessage}</Text> : null}</View>
      <View style={styles.wordList}>
        <FlatList
          data={state.lists[state.activeList].words}
          keyExtractor={({ from }) => {
            return from;
          }}
          renderItem={({ item }) => {
            return (
              <View style={styles.wordItem}>
                <Text style={common.text}>
                  {item.from} - {item.to}
                </Text>
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
    // backgroundColor: "#e5e5e5",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 1.5,
    // elevation: 3,
    // borderWidth: 0.5,
    // borderColor: "#413C58",
    // borderRadius: 3,
    // color: "#333333",

    backgroundColor: "#fbfbfb",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 8,
    borderWidth: 0.1,
    borderColor: "#413C58",
    borderRadius: 1,
    color: "#333333",
  },
  text: {
    color: "#333333",
    fontSize: 15,
  },
});
const styles = StyleSheet.create({
  layout: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgb(253,225,132)",
  },
  input: {
    padding: 5,
    minHeight: 70,
    width: 300,
    alignSelf: "center",
    fontSize: 15,
    ...common.baseCard,
  },
  output: {
    padding: 5,
    marginTop: 15,
    height: 150,
    width: 300,
    fontSize: 15,

    ...common.baseCard,
  },
  wordList: {
    marginTop: 15,
    marginBottom: 15,
    alignSelf: "stretch",
    borderRadius: 2,
    flex: 1,
  },
  wordItem: {
    height: 40,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
    width: "95%",

    ...common.baseCard,
  },
  button: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ffffff",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 40,
    marginTop: 15,
    backgroundColor: "tomato",
    borderRadius: 5,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.30,
    // shadowRadius: 4.65,
    // elevation: 8,
  },
});

export default TranslateScreen;
