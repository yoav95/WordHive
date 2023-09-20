import React, { useEffect, useRef, useState } from "react";
import styles from "./Word.module.css";
import Meaning from "../Meaning/Meaning.jsx";
import Button from "../Button/Button.jsx";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import {
  formatTimestamp,
  removeSingleWordFromStorage,
  markWord,
} from "../../../public/helpers";
import { FaCrown } from "react-icons/fa6";
const Word = ({ word, timestamp, data, id, onUpdate, marked }) => {
  const audioRef = useRef();
  // there are more objects in the array, but for now i choose one.
  const meanings = data[0].meanings;

  useEffect(() => {
    // implementing animation
    console.log(audioRef);
  }, []);

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
  const playAudio = () => {
    audioRef.current.play();
  };

  const audioUrl = getAudioUrl();

  return (
    <div className={styles.word}>
      <audio ref={audioRef} src={audioUrl}></audio>
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
      <div className={styles.theword}>
        {audioUrl && (
          <div onClick={playAudio}>
            <HiOutlineSpeakerWave size={20} />
          </div>
        )}
        <h1>{word}</h1>
      </div>

      <Meaning meanings={meanings} />
    </div>
  );
};

export default Word;
