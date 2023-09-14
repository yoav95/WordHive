import React, { useEffect, useState } from "react";
import { getWordsFromStorage } from "../public/helpers";
import styles from "./App.module.css";
import Word from "./components/Word/Word.jsx";
const App = () => {
  const [words, setWords] = useState(null);
  useEffect(() => {
    const x = async () => {
      const allWords = await getWordsFromStorage();
      const foramttedWords = allWords.map((word) => {
        return {
          word: word.text,
          timestamp: word.timestamp,
          data: word.definition,
        };
      });
      setWords(foramttedWords);
    };
    x();
  }, []);

  return (
    <div className={styles.grid}>
      {words && words.map((word) => <Word {...word} />)}
    </div>
  );
};

export default App;
