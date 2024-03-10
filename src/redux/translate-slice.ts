import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Language {
  code: string;
  name: string;
}
interface TranslateState {
  history: { userText: string; translatedText: string }[];
  allLanguages: Language[];
  currentText: string;
}

const initialState: TranslateState = {
  currentText: "",
  history: [],
  allLanguages: [],
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {
    translateHistory: (
      state,
      action: PayloadAction<{ userText: string; translatedText: string }>
    ) => {
      let item = state.history.find(
        (history) => history.userText === action.payload.userText
      );
      if (!item) state.history.push(action.payload);

      if (state.history.length > 5) state.history.shift();
    },

    getAllLanguages: (state, action: PayloadAction<Language[]>) => {
      state.allLanguages = action.payload;
    },

    textToTranslate: (state, action: PayloadAction<string>) => {
      state.currentText = action.payload;
    },
  },
});

export const translateActions = translateSlice.actions;
export default translateSlice;
