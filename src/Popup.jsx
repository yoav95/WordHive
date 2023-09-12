import React, { useEffect } from "react";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import "./styles.css";

// for developing live
// chrome-extension://ebgphmifkdddclkolclgekikgfbcgene/popup.html
const rootElem = document.getElementById("react-target");
const root = createRoot(rootElem);

root.render(<App />);
