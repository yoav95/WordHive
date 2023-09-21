import React from "react";
import styles from "./Question.module.css";
import Option from "./Option.jsx";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const Question = ({ question, onUserChoise }) => {
  let options = [];
  const optionOne = question.options.one.definition[0].meanings[0].definitions;
  const oneDefinitions =
    optionOne.length > 4 ? optionOne.slice(0, 4) : optionOne;
  options.push({ definition: oneDefinitions, correct: false });
  const optionTwo = question.options.two.definition[0].meanings[0].definitions;
  const twoDefinitions =
    optionTwo.length > 4 ? optionTwo.slice(0, 4) : optionTwo;
  options.push({ definition: twoDefinitions, correct: false });
  const answer = question.options.answer.definition[0].meanings[0].definitions;
  const answerDefintion = answer.length > 4 ? answer.slice(0, 4) : answer;
  options.push({ definition: answerDefintion, correct: true });
  shuffleArray(options);

  const choiseHandler = (correct) => {
    onUserChoise(correct);
  };

  return (
    <div className={styles.question}>
      <div className={styles.word}>
        <h1>{question.word}</h1>
      </div>
      <div className={styles.options}>
        {options.map((option) => (
          <Option
            definitions={option.definition}
            correct={option.correct}
            onUserChoise={choiseHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Question;
