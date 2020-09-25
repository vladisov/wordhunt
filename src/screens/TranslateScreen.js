import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import LangSelect from "../components/LangSelect";
import useTranslation from "../hooks/useTranslation";
import { Context } from "../context/WordContext";

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
  const { state, addWord, deleteWord } = useContext(Context);

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
      <Button
        title="Translate"
        onPress={() => {
          getTranslation(word, langFrom.value, langTo.value, addWord);
        }}
      />
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
                <Text>
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

const styles = StyleSheet.create({
  layout: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    padding: 5,
    minHeight: 70,
    width: 300,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
  },
  output: {
    padding: 5,
    marginTop: 15,
    height: 150,
    width: 300,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
  },
  wordList: {
    marginTop: 15,
    marginBottom: 15,
    width: 300,
    borderRadius: 2,
    flex: 1,
  },
  wordItem: {
    height: 40,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    color: "black",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default TranslateScreen;
