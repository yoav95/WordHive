import React, { useState } from "react";
import "../styles.css";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const Definition = ({ definitions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const toggleDefinition = (next) => {
    if (next) {
      if (currentIndex < definitions.length - 1) {
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
  return (
    <div className="meaning-component definition-box">
      <FaAngleLeft onClick={() => toggleDefinition(false)} />
      <div className="meaning-component definition">
        {/* need to add a componet for this... more than one definition for each meaning object */}
        <p>{definitions[currentIndex].definition}</p>
      </div>
      <FaAngleRight onClick={() => toggleDefinition(true)} />
    </div>
  );
};

export default Definition;
