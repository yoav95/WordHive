import React, { useEffect, useState } from "react";
import { getWordsFromStorage } from "../public/helpers";
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
      {words &&
        words.map((word) => (
          <div className="word" key={word.id}>
            {word.text}
          </div>
        ))}
    </div>
  );
};

export default App;
