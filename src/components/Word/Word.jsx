import React from "react";
import styles from "./Word.module.css";
import Meaning from "../Meaning/Meaning.jsx";
import Button from "../Button/Button.jsx";
import { formatTimestamp } from "../../../public/helpers";
const Word = ({ word, timestamp, data }) => {
  // there are more objects in the array, but for now i choose one.
  const meanings = data[0].meanings;
  return (
    <div className={styles.word}>
      <div className={styles.control}>
        <p>added on {formatTimestamp(new Date(timestamp))}</p>
        <Button>Remove</Button>
        <Button>Mark Word</Button>
      </div>
      <h1>{word}</h1>
      <Meaning meanings={meanings} />
    </div>
  );
};

export default Word;
