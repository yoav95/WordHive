import React from "react";
import styles from "./Button.module.css";
const Button = ({ children, action }) => {
  return (
    <button className={styles.btn} onClick={action}>
      {children}
    </button>
  );
};

export default Button;