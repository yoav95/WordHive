import React, { useEffect, useState } from "react";
import { getWordsFromStorage } from "../public/helpers";
import Word from "./components/Word.jsx";

const App = () => {
  const [words, setWords] = useState(null);
  useEffect(() => {
    const x = async () => {
      const allWords = await getWordsFromStorage();
      setWords(allWords);
    };
    x();
  }, []);
  return (
    <div className="grid">
      {words && words.map((word) => <Word key={word.id} {...word} />)}
    </div>
  );
};

export default App;
