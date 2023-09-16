import React, { useState } from "react";
import styles from "./Word.module.css";
import PopUpMeaning from "./PopUpMeaning.jsx";
import Button from "../Button/Button.jsx";
import {
  formatTimestamp,
  removeSingleWordFromStorage,
  markWord,
} from "../../../public/helpers";
import { FaCrown } from "react-icons/fa6";
import { unmountComponentAtNode } from "react-dom";
const PopUpWord = ({ word, timestamp, data, id, onUpdate, marked }) => {
  const [show, setShow] = useState(true);
  // there are more objects in the array, but for now i choose one.
  const meanings = data[0].meanings;
  const unMountComponent = () => {
    setShow(false);
  };
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
    <>
      {show && (
        <div className={styles.word} onClick={unMountComponent}>
          <div className={styles.control}>
            <p>added on {formatTimestamp(new Date(timestamp))}</p>
          </div>
          <h1 style={{ marginTop: "1rem" }}>{word}</h1>
          <PopUpMeaning meanings={meanings} />
        </div>
      )}
    </>
  );
};

export default PopUpWord;
