import React, { useEffect } from "react";

import { createRoot } from "react-dom/client";
import "./main.css";
import Practice from "./Practice.jsx";
// for developing live
// chrome-extension://ebgphmifkdddclkolclgekikgfbcgene/popup.html
const rootElem = document.getElementById("react-game");
const root = createRoot(rootElem);

root.render(<Practice />);
