import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import useLanguages from "../hooks/useLanguages";
import { ModalSelectList } from "react-native-modal-select-list";
import { TouchableOpacity } from "react-native-gesture-handler";

let fromModal;
let toModal;
const openModal = (from) => {
  if (from) {
    fromModal.show();
  } else {
    toModal.show();
  }
};
const fromModalRef = (ref) => (fromModal = ref);
const toModalRef = (ref) => (toModal = ref);

const LangSelect = ({
  langFrom,
  langTo,
  onFromLanguageChange,
  onToLanguageChange,
}) => {
  const [languages, errorMessage] = useLanguages();

  const onSelectedOption = (value, isFromValue) => {
    const selected = languages.find((lang) => lang.value === value);
    console.log(isFromValue);

    if (isFromValue) {
      console.log("change from");
      onFromLanguageChange(selected);
    } else {
      onToLanguageChange(selected);
    }
  };

  return (
    <View style={styles.layout}>
      <View>
        <TouchableOpacity
          style={styles.langLayout}
          onPress={() => openModal(true)}
        >
          <Text style={styles.langText}>{langFrom.label}</Text>
          <ModalSelectList
            ref={fromModalRef}
            placeholder={"Choose language..."}
            closeButtonText={"Close"}
            options={languages}
            onSelectedOption={(value) => onSelectedOption(value, true)}
            disableTextSearch={false}
            numberOfLines={3}
          />
        </TouchableOpacity>
      </View>
      <Text>{"<->"}</Text>
      <View>
        <TouchableOpacity
          style={styles.langLayout}
          onPress={() => openModal(false)}
        >
          <Text style={styles.langText}>{langTo.label}</Text>
        </TouchableOpacity>
        {/* <Button } title={langTo.label} /> */}
        <ModalSelectList
          ref={toModalRef}
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
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  langLayout: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 25,
    marginTop: 15,
    backgroundColor: "tomato",
    borderRadius: 5,
  },
  langText: {
    color: "#ffffff",
  },
});

export default LangSelect;
