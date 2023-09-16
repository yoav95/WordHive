import React, { useEffect, useState } from "react";
import styles from "./Box.module.css";
import PopUpWord from "./components/PopUpWord/PopUpWord.jsx";

const Box = () => {
  const [word, setWord] = useState(null);
  useEffect(() => {
    const wordObject = JSON.parse(sessionStorage.getItem("wordObject"));
    const formattedWordObject = {
      word: wordObject.text,
      timestamp: wordObject.timestamp,
      data: wordObject.definition,
      id: wordObject.id,
      marked: wordObject.marked,
    };
    setWord(formattedWordObject);
  }, []);
  console.log(word);

  const triggerRerender = () => {
    alert("Yo");
  };

  return (
    <div className={styles.box}>
      {word && <PopUpWord key={word.id} {...word} onUpdate={triggerRerender} />}
    </div>
  );
};

export default Box;
