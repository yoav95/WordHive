import React, { useState } from "react";
import { ReactDOM } from "react";
import styles from "./Word.module.css";
import PopUpMeaning from "./PopUpMeaning.jsx";
import Button from "../Button/Button.jsx";
import {
  formatTimestamp,
  removeSingleWordFromStorage,
  markWord,
} from "../../../public/helpers.js";
import { FaCrown } from "react-icons/fa6";
import { unmountComponentAtNode } from "react-dom";
const PopUpWord = ({ word, timestamp, data, id, onUpdate, marked }) => {
  const [showComponent, setShowComponent] = useState(true);
  const addedDate = formatTimestamp(timestamp);

  const sendRemoveMessage = (event) => {
    event.stopPropagation();
    window.postMessage({ from: "WORD", action: "REMOVE", payload: id }, "*");
    setShowComponent(false);
  };

  const sendMarkMessage = (event) => {
    event.stopPropagation();
    window.postMessage({ from: "WORD", action: "MARK", payload: id }, "*");
    setShowComponent(false);
  };

  return (
    <>
      {showComponent && (
        <div className={styles.word} onClick={() => setShowComponent(false)}>
          <div className={styles.control}>
            <Button action={sendRemoveMessage} size="sm">
              Remove
            </Button>
            <Button action={sendMarkMessage} size="sm">
              Mark
            </Button>
            <p className={styles.date}>Added on {addedDate}</p>
          </div>
          <div className={styles.theword}>{word}</div>
          <div>
            <PopUpMeaning meanings={data[0].meanings} />
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpWord;
