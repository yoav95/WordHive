import React, { useEffect, useState } from "react";
import styles from "./Meaning.module.css";
import { FaRegCircleDot } from "react-icons/fa6";
import Button from "../Button/Button.jsx";
const Meaning = ({ meanings }) => {
  const [currentMeaning, setCurrentMeaning] = useState(meanings[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentMeaning(meanings[currentIndex]);
  }, [currentIndex]);
  const changeMeaning = () => {
    setCurrentIndex((prev) => {
      return (prev + 1) % meanings.length;
    });
  };
  console.log(currentIndex, currentMeaning);
  return (
    <div className={styles.meaning}>
      <div>
        <p>Part Of Speech: {currentMeaning.partOfSpeech}</p>
        <div className={styles.list}>
          {currentMeaning.definitions.map((definition, index) => (
            <div className={styles.definition}>
              <span>
                <FaRegCircleDot />
              </span>
              <p className={styles.text}>{definition.definition}</p>
              {definition.example && (
                <p className={styles.example}>Example: {definition.example}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {meanings.length > 1 && <Button>See Diffrent Meaning</Button>}
    </div>
  );
};

export default Meaning;
