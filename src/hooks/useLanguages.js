import { useState, useEffect } from "react";
import api from "../api/translationApi";

export default () => {
  const [langs, setLangs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getLangs = async () => {
    try {
      const response = await api.get("/languages", {
        params: {
          "api-version": "3.0",
        },
      });

      const translationLanguages = response.data.translation;
      const supportedLanguages = [];
      Object.keys(translationLanguages).forEach((key) => {
        supportedLanguages.push({
          value: key,
          label: translationLanguages[key].name,
        });
      });

      setLangs(supportedLanguages);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    getLangs();
  }, []);

  return [langs, errorMessage];
};
