import React, { useEffect, useState } from "react";
import { getWordsFromStorage } from "../public/helpers";
import styles from "./App.module.css";
import Word from "./components/Word/Word.jsx";
const App = () => {
  const [words, setWords] = useState(null);
  const [rerender, setRerender] = useState(0);
  const triggerRerender = () => {
    setRerender((prev) => prev + 1);
  };
  useEffect(() => {
    const x = async () => {
      const allWords = await getWordsFromStorage();
      const foramttedWords = allWords.map((word) => {
        return {
          word: word.text,
          timestamp: word.timestamp,
          data: word.definition,
          id: word.id,
          marked: word.marked,
        };
      });
      setWords(foramttedWords);
      if (!window.trigerNewRender) {
        window.triggerNewRender = triggerRerender;
      }
    };
    x();
  }, [rerender]);
  return (
    <div className={styles.grid}>
      {words &&
        words.map((word) => (
          <Word key={word.id} {...word} onUpdate={triggerRerender} />
        ))}
    </div>
  );
};

export default App;
