import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Definition from "./Definition.jsx";
const Meaning = ({ meanings }) => {
  const [currentMeaning, setCurrentMeaning] = useState(meanings[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentMeaning(meanings[currentIndex]);
  }, [currentIndex]);

  const toggleMeaning = (next) => {
    if (next) {
      if (currentIndex < meanings.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        return;
      }
    } else {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        return;
      }
    }
  };
  console.log(currentMeaning);
  return (
    <div className="meaning-component">
      <h2>Part Of Speech: verb</h2>
      <Definition definitions={currentMeaning.definitions} />
      <h2>Synonyms</h2>
      <ul className="meaning-component synonyms">
        {currentMeaning.synonyms.map((synonym) => (
          <li key={synonym}>{synonym}</li>
        ))}
      </ul>
    </div>
  );
};

export default Meaning;
