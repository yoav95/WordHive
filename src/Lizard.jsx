import React, { useEffect } from "react";
import Box from "./Box.jsx";
import { createRoot } from "react-dom/client";
import "./main.css";
// for developing live
// chrome-extension://ebgphmifkdddclkolclgekikgfbcgene/popup.html
const rootElem = document.getElementById("react-anchor");
const root = createRoot(rootElem);

root.render(<Box />);
