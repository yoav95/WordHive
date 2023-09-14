import React from "react";
import styles from "./Button.module.css";
const Button = ({ children, action, size }) => {
  let btnClass = styles.btn;
  if (size === "md") {
    btnClass = `${styles.btn} ${styles.md}`;
  } else if (size === "lg") {
    btnClass = `${styles.btn} ${styles.lg}`;
  } else if (size === "sm") {
    btnClass = `${styles.btn} ${styles.sm}`;
  }
  return (
    <button className={btnClass} onClick={action}>
      {children}
    </button>
  );
};

export default Button;
