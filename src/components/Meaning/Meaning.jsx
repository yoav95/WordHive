import React, { useEffect, useState } from "react";
import styles from "./Meaning.module.css";
import { FaRegCircleDot } from "react-icons/fa6";
import Button from "../Button/Button.jsx";
const Meaning = ({ meanings }) => {
  const [currentMeaning, setCurrentMeaning] = useState(meanings[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slicedSynonims = currentMeaning.synonyms.slice(0, 5);
  useEffect(() => {
    setCurrentMeaning(meanings[currentIndex]);
  }, [currentIndex]);
  const changeMeaning = () => {
    setCurrentIndex((prev) => {
      return (prev + 1) % meanings.length;
    });
  };
  return (
    <div className={styles.meaning}>
      <div>
        <p>Part Of Speech: {currentMeaning.partOfSpeech}</p>
        <div className={styles.list}>
          {currentMeaning.definitions.map((definition, index) => (
            <div className={styles.definition} key={Math.random()}>
              <p className={styles.text}>
                <span style={{ marginRight: "1rem" }}>
                  <FaRegCircleDot />
                </span>
                {definition.definition}
              </p>
              {definition.example && (
                <p className={styles.example}>Example: {definition.example}</p>
              )}
            </div>
          ))}
        </div>
        {currentMeaning.synonyms.length > 0 && (
          <>
            <h3 style={{ marginTop: "1rem" }}>Synonyms</h3>
            <div className={styles.synonyms}>
              {slicedSynonims.map((synonym) => (
                <p>{synonym}</p>
              ))}
            </div>
          </>
        )}
      </div>
      {meanings.length > 1 && (
        <div style={{ marginTop: "1rem" }}>
          <Button size="md" action={changeMeaning}>
            See Diffrent Meaning
          </Button>
        </div>
      )}
    </div>
  );
};

export default Meaning;
