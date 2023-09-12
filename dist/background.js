import { handleUserRequest } from "./helpers.js";
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "1",
    title: "WordHive - Add Word!",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener(handleUserRequest);
