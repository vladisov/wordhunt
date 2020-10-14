import { useState } from "react";
import api from "../api/translationApi";

const translateWord = async (from, to, word, endpoint) => {
  return api.post(
    endpoint,
    [
      {
        text: word,
      },
    ],
    {
      params: {
        "api-version": "3.0",
        from: from,
        to: to,
      },
    }
  );
};

export default () => {
  const [dictionaryTranslation, setDictionaryTranslation] = useState({});
  const [translation, setTranslation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getTranslation = async (word, from, to, addToList) => {
    console.log("word " + word);
    try {
      const response = await translateWord(from, to, word, "/translate");
      const text = response.data[0].translations[0].text;
      console.log("translation " + JSON.stringify(response.data));
      setDictionaryTranslation(
        text ? { normalizedTarget: text.toLowerCase() } : word
      );
    } catch (err) {
      console.log(err);
      console.log(err.config);
      setErrorMessage(err.message);
    }
  };

  const getDictionaryTranslation = async (word, from, to, addToList) => {
    console.log("word " + word);
    try {
      const response = await api.post(
        "/dictionary/lookup",
        [
          {
            text: word,
          },
        ],
        {
          params: {
            "api-version": "3.0",
            from: from,
            to: to,
          },
        }
      );
      console.log("translation " + JSON.stringify(response.data));
      if (response.data) {
        const data = response.data[0];
        const { translations } = data;
        const text =
          translations.length > 0
            ? translations[0].normalizedTarget
            : data.normalizedSource;
        setDictionaryTranslation(data);
        addToList(word, text.toLowerCase());
      }
    } catch (err) {
      console.log(err);
      console.log(err.config);
      setErrorMessage(err.message);
    }
  };

  return [
    getTranslation,
    getDictionaryTranslation,
    dictionaryTranslation,
    setDictionaryTranslation,
    errorMessage,
  ];
};
