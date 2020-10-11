import { call } from "react-native-reanimated";
import createDataContext from "./createDataContext";

const findWord = (words, from) => {
  return words.find((word) => word.from === from);
};

const updateActiveList = (state, listId) => {
  const selected = state.lists[listId];
  if (selected) {
    return { ...state, activeList: listId };
  }
  return state;
};

const addWordToActiveList = (state, payload) => {
  const { from, to } = payload;
  const { activeList, lists } = state;
  const list = lists[activeList];
  if (list) {
    if (findWord(list.words, from)) {
      return state;
    }
    const words = [
      ...list.words,
      {
        from: from,
        to: to,
      },
    ];
    lists[activeList].words = words;
    return { ...state, lists: lists };
  }
  return state;
};

const wordReducer = (state, action) => {
  switch (action.type) {
    case "add_word":
      return addWordToActiveList(state, action.payload);
    case "delete_word":
      const { id, word } = action.payload;
      const { lists } = state;
      const words = lists[id].words;
      const filtered = words.filter((curr) => {
        return curr.from !== word.from;
      });
      lists[id].words = filtered;
      return { ...state, lists: lists };
    case "select_list":
      return updateActiveList(state, action.payload);
    case "create_list": {
      const { lists } = state;
      if (!lists[action.payload]) {
        lists[action.payload] = { words: [] };
        return { ...state, lists: lists };
      } else {
        //exception
        console.log(`list with name ${action.payload} already exists`);
      }
      return state;
    }
    default:
      return state;
  }
};

const createList = (dispatch) => {
  return (name, callback) => {
    dispatch({ type: "create_list", payload: name });
    callback();
  };
};

const selectList = (dispatch) => {
  return (name) => {
    dispatch({ type: "select_list", payload: name });
  };
};

const addWord = (dispatch) => {
  return (from, to) => {
    dispatch({ type: "add_word", payload: { from, to } });
  };
};

const deleteWord = (dispatch) => {
  return (id, word) => {
    dispatch({ type: "delete_word", payload: { id, word } });
  };
};

export const { Context, Provider } = createDataContext(
  wordReducer,
  { addWord, deleteWord, selectList, createList, deleteWord },
  {
    activeList: "default",
    lists: {
      default: {
        words: [{ from: "from", to: "to" }],
      },
      testList: {
        words: [],
      },
    },
  }
);
