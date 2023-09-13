import React, { useState } from "react";
import "../styles.css";
import Meaning from "./Meaning.jsx";
const Word = ({ text, timestamp, id, definition }) => {
  // meaningsArray, each element is an array
  const meaningsArray = definition[0].meanings;
  return (
    <div className="word-component">
      <div>added on {Date.now().toString()}, was watched:(11) times</div>
      <div>
        <h1 className="word-component word">{text}</h1>
        <p className="word-component explain">
          There are {meaningsArray.length} meanings for this word
          <br />
          Your can toggle between them using the arrows below
        </p>
      </div>
      <Meaning meanings={meaningsArray} />
      <div>Delete word change color</div>
    </div>
  );
};

export default Word;
