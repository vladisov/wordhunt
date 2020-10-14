import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const DictionaryTranslation = ({ translation }) => {
  if (Object.keys(translation).length == 0) {
    return <View />;
  }
  console.log(JSON.stringify(translation));
  const { translations, normalizedSource, normalizedTarget } = translation;

  const getMainWord = () => {
    if (translations && translations.length > 0) {
      return translations[0].normalizedTarget;
    }
    if (normalizedTarget) {
      return normalizedTarget;
    }
    return normalizedSource;
  };

  return (
    <View style={styles.layout}>
      <Text style={styles.mainWord}>{getMainWord()}</Text>
      {translations && translations.length > 0
        ? getAdditionalWords(translations)
        : null}
    </View>
  );
};

const getAdditionalWords = (translations) => {
  return (
    <View style={{ paddingTop: 5 }}>
      <Text
        style={{
          fontWeight: "200",
          color: "gray",
          marginTop: 10,
          fontSize: 14,
        }}
      >
        Alternative translations:
      </Text>
      {translations.map((translation, index) => {
        return (
          <Text style={styles.alternative}>{translation.normalizedTarget}</Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    flexDirection: "column",
  },
  mainWord: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
  },
  alternative: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "300",
  },
});

export default DictionaryTranslation;
