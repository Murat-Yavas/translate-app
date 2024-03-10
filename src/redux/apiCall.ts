import { translateActions } from "./translate-slice";

export const getLanguages = async (dispatch: any) => {
  const url = "https://text-translator2.p.rapidapi.com/getLanguages";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(translateActions.getAllLanguages(result.data.languages));
  } catch (error) {
    console.error(error);
  }
};

export const translateText = async (
  text: string,
  source_language: string,
  target_language: string,
  dispatch: any
) => {
  const url = "https://text-translator2.p.rapidapi.com/translate";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      body: new URLSearchParams({
        source_language,
        target_language,
        text,
      }),
    });
    const result = await response.json();
    let historyItem = {
      userText: text,
      translatedText: result.data.translatedText,
    };
    dispatch(translateActions.textToTranslate(result.data.translatedText));
    dispatch(translateActions.translateHistory(historyItem));
  } catch (error) {
    console.error(error);
  }
};
