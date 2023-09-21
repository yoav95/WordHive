import React, { useEffect, useState } from "react";
import styles from "./Practice.module.css";
import Question from "./components/Question/Question.jsx";
import { getQuestion } from "../public/helpers";
import "./main.css";
const Practice = () => {
  const [allWords, setAllWords] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [stop, setStop] = useState(false);
  const [msg, setMsg] = useState(null);
  const [running, setRunning] = useState(false);

  const startPractice = async () => {
    const newQuestion = await getQuestion();
    setCurrentQuestion(newQuestion);
    setRunning(true);
  };

  const userChoiseHandler = (correct) => {
    if (correct) {
      setStop(true);
      setMsg("Correct! Well Done");
    } else {
      setStop(true);
      setMsg("Wrong!");
    }
    setTimeout(() => {
      setStop(false);
      startPractice();
    }, 2000);
  };

  return (
    <div className={styles.wrapper}>
      {running && !stop && (
        <Question question={currentQuestion} onUserChoise={userChoiseHandler} />
      )}
      {!running && (
        <button onClick={startPractice} className={styles.btn}>
          START
        </button>
      )}
      {stop && <p>{msg}</p>}
    </div>
  );
};

export default Practice;
