import React from "react";
import styles from "./Question.module.css";

const Option = ({ definitions, correct, onUserChoise }) => {
  const handleClick = () => {
    if (correct) {
      onUserChoise(true);
    } else {
      onUserChoise(false);
    }
  };
  return (
    <div className={styles.option} onClick={handleClick}>
      {definitions.map((def, index) => (
        <p className={styles.p} key={index}>
          {def.definition}
        </p>
      ))}
    </div>
  );
};

export default Option;
