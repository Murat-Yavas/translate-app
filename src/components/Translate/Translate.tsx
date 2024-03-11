import styles from "./Translate.module.css";
import { translateText } from "../../redux/apiCall";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

const Translate = () => {
  const translateHistory = useAppSelector((state) => state.translate.history);
  const languageList = useAppSelector((state) => state.translate.allLanguages);
  const currentText = useAppSelector((state) => state.translate.currentText);
  const [enteredText, setEnteredText] = useState("");

  const dispatch = useAppDispatch();

  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("de");

  useEffect(() => {
    let timer = setTimeout(() => {
      if (enteredText.length > 0) {
        translateText(enteredText, sourceLanguage, targetLanguage, dispatch);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredText, targetLanguage]);

  const handleHistoryItem = (text: string) => {
    if (text.length > 0) {
      setEnteredText(text);
    }
  };

  return (
    <>
      <div className={`${styles["translate-area"]}`}>
        <div className={styles.actions}>
          <div className={`${styles["select-action"]}`}>
            <form className="max-w-sm mx-auto ">
              <label
                htmlFor="languages"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              ></label>
              <select
                id="languages"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-200 to-lime-200 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-600 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                {languageList.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className={styles["text-action"]}>
            <textarea
              placeholder="Text"
              rows={8}
              value={enteredText}
              onChange={(e) => setEnteredText(e.target.value)}
              className="bg-teal-500 resize-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-white"
            ></textarea>
            {enteredText.length > 0 ? (
              <ImCross
                className={styles["delete-action"]}
                onClick={() => setEnteredText("")}
              />
            ) : null}
          </div>
        </div>

        <div className={styles.actions}>
          <div className={styles["select-action"]}>
            <form className="max-w-sm mx-auto ">
              <label
                htmlFor="languages"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              ></label>
              <select
                id="languages"
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-200 to-lime-200 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-teal-600 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                {languageList.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <div className={styles["text-action"]}>
            <textarea
              placeholder="Translation"
              disabled
              rows={8}
              value={enteredText ? currentText : ""}
              className="bg-teal-500 resize-none block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-white"
            ></textarea>
          </div>
        </div>
      </div>

      {translateHistory.length > 0 ? (
        <div className={styles["history-area"]}>
          <div className={styles.title}>
            <h2>HISTORY</h2>
          </div>
          <div className={styles["history-text-list"]}>
            {translateHistory.map((history, index) => (
              <li
                className={`${styles["history-text"]} bg-teal-500 w-3/5 cursor-pointer mb-4 rounded-lg`}
                key={index}
                onClick={() => handleHistoryItem(history.userText)}
              >
                {history.userText} - {history.translatedText}
              </li>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Translate;
