import React, { useRef, useState } from "react";
import styles from "./Word.module.css";
import Meaning from "../Meaning/Meaning.jsx";
import Button from "../Button/Button.jsx";
import {
  formatTimestamp,
  removeSingleWordFromStorage,
  markWord,
} from "../../../public/helpers";
import { FaCrown } from "react-icons/fa6";
const Word = ({ word, timestamp, data, id, onUpdate, marked }) => {
  // there are more objects in the array, but for now i choose one.
  const meanings = data[0].meanings;

  const handleMarkWord = async () => {
    const success = await markWord(id);
    if (success) {
      onUpdate();
    }
  };
  const handleRemove = async () => {
    const success = await removeSingleWordFromStorage(id);
    if (success) {
      onUpdate();
    } else {
      alert("failed to remove");
    }
  };
  return (
    <div className={styles.word}>
      {marked && (
        <div className={styles.marked}>
          <FaCrown size={32} color="#f49d37" />
        </div>
      )}
      <div className={styles.control}>
        <p>added on {formatTimestamp(new Date(timestamp))}</p>
        <div className={styles.btns}>
          <Button size="sm" action={handleRemove}>
            Remove
          </Button>
          <Button size="sm" action={handleMarkWord}>
            Mark Word
          </Button>
        </div>
      </div>
      <h1 style={{ marginTop: "1rem" }}>{word}</h1>
      <Meaning meanings={meanings} />
    </div>
  );
};

export default Word;
