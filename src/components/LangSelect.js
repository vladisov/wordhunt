import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import useLanguages from "../hooks/useLanguages";
import { ModalSelectList } from "react-native-modal-select-list";

const openModal = () => modalRef.show();
const saveModalRef = (ref) => (modalRef = ref);

const LangSelect = ({
  langFrom,
  langTo,
  onFromLanguageChange,
  onToLanguageChange,
}) => {
  const [languages, errorMessage] = useLanguages();

  const onSelectedOption = (value, isFromValue) => {
    const selected = languages.find((lang) => lang.value === value);
    if (isFromValue) {
      onFromLanguageChange(selected);
    } else {
      onToLanguageChange(selected);
    }
  };

  return (
    <View style={styles.layout}>
      <View style={styles.fromLang}>
        <Button onPress={() => openModal()} title={langFrom.label} />
        <ModalSelectList
          ref={saveModalRef}
          placeholder={"Choose language..."}
          closeButtonText={"Close"}
          options={languages}
          onSelectedOption={(value) => onSelectedOption(value, false)}
          disableTextSearch={false}
          numberOfLines={3}
        />
      </View>
      <Text>{"->"}</Text>
      <View style={styles.toLang}>
        <Button onPress={() => openModal()} title={langTo.label} />
        <ModalSelectList
          ref={saveModalRef}
          placeholder={"Choose language..."}
          closeButtonText={"Close"}
          options={languages}
          onSelectedOption={(value) => onSelectedOption(value, false)}
          disableTextSearch={false}
          numberOfLines={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  fromLang: {
    margin: 10,
  },
  toLang: {
    margin: 10,
  },
});

export default LangSelect;
