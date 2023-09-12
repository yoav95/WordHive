import React, { useEffect } from "react";
import { render } from "react-dom";
import Word from "./components/Word.jsx";
import "./styles.css";

// for developing live
// chrome-extension://ebgphmifkdddclkolclgekikgfbcgene/popup.html

const Popup = () => {
  return (
    <div className="grid">
      <Word />
      <Word />
      <Word />
      <Word />
      <Word />
    </div>
  );
};

render(<Popup />, document.getElementById("react-target"));
