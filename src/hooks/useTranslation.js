import { useState } from "react";
import api from "../api/translationApi";

export default () => {
  const [translation, setTranslation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const getTranslation = async (word, from, to, addToList) => {
    console.log("word " + word);
    try {
      const response = await api.post(
        "/translate",
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
      const text = response.data[0].translations[0].text;
      console.log("translation " + JSON.stringify(response.data));
      setTranslation(text ? text.toLowerCase() : word);
      if (text) {
        addToList(word, text.toLowerCase());
      }
    } catch (err) {
      console.log(err);
      console.log(err.config);
      setErrorMessage(err.message);
    }
  };

  return [getTranslation, translation, setTranslation, errorMessage];
};
