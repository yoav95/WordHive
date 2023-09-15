import { handleUserRequest } from "./helpers.js";
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "1",
    title: "WordHive - Add Word!",
    contexts: ["selection"],
  });
});

// for handling user mark word on webpage
chrome.contextMenus.onClicked.addListener(handleUserRequest);

// for handling click on the extension icon (=> new tab with popup.jsx)
chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: "popup.html" });
});
