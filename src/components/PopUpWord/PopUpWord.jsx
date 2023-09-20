import React, { useState, useRef } from "react";
import { ReactDOM } from "react";
import styles from "./Word.module.css";
import PopUpMeaning from "./PopUpMeaning.jsx";
import Button from "../Button/Button.jsx";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
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
  const audioRef = useRef();

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

  const getAudioUrl = () => {
    if (data[0].phonetics.length === 0) {
      return null;
    }
    for (let i = 0; i < data[0].phonetics.length; i++) {
      let str = data[0].phonetics[i].audio;
      if (str.startsWith("https://")) {
        return str;
      }
    }
  };
  const playAudio = (event) => {
    event.stopPropagation();
    audioRef.current.play();
  };

  const audioUrl = getAudioUrl();

  return (
    <>
      {showComponent && (
        <div className={styles.word} onClick={() => setShowComponent(false)}>
          <audio ref={audioRef} src={audioUrl}></audio>
          <div className={styles.control}>
            <div className={styles.box}>
              <Button action={sendRemoveMessage} size="sm">
                Remove
              </Button>
              <Button action={sendMarkMessage} size="sm">
                Mark
              </Button>
            </div>
            <p className={styles.date}>Added on {addedDate}</p>
          </div>

          <div className={styles.theword}>
            {audioUrl && (
              <div className={styles.audiobtn} onClick={playAudio}>
                <HiOutlineSpeakerWave size={20} />
              </div>
            )}
            <h1>{word}</h1>
          </div>
          <div>
            <PopUpMeaning meanings={data[0].meanings} />
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpWord;
