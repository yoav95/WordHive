import React, { useEffect, useState } from "react";
import styles from "./Meaning.module.css";
import { FaRegCircleDot } from "react-icons/fa6";
import Button from "../Button/Button.jsx";
const PopUpMeaning = ({ meanings }) => {
  const [currentMeaning, setCurrentMeaning] = useState(meanings[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentMeaning(meanings[currentIndex]);
  }, [currentIndex]);

  const changeIndex = (event) => {
    event.stopPropagation();
    setCurrentIndex((prev) => {
      return (prev + 1) % meanings.length;
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <p>Part Of Speech: {currentMeaning.partOfSpeech}</p>
        <ul className={styles.list}>
          {currentMeaning.definitions.map((definition) => (
            <li>
              <div className={styles.definition}>
                <p>{definition.definition}</p>
                {definition.example && <p>{definition.example}</p>}
              </div>
            </li>
          ))}
          <li>
            <Button action={changeIndex} size="md">
              See other meaning
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PopUpMeaning;
