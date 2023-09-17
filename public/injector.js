const markWord = async (wordId) => {
  return new Promise(async (resolve, reject) => {
    const words = await getWordsFromStorage();
    const wordToUpdate = words.find((word) => word.id === wordId);
    wordToUpdate.marked = !wordToUpdate.marked;
    let obj = {};
    obj["words"] = words;
    chrome.storage.local.set(obj, function () {
      resolve(true);
    });
  });
};

const removeSingleWordFromStorage = async (wordId) => {
  return new Promise(async (resolve, reject) => {
    const words = await getWordsFromStorage();
    const wordIsFound = words.find((word) => word.id === wordId);
    if (wordIsFound) {
      const newWords = words.filter((word) => word.id !== wordId);
      let obj = {};
      obj["words"] = newWords;
      chrome.storage.local.set(obj, function () {
        resolve(true);
      });
    } else {
      reject(false);
    }
  });
};

window.addEventListener("message", async function (event) {
  if (event.data.action === "REMOVE" && event.data.from === "WORD") {
    const { payload } = event.data;
    console.log("removing: ", payload);
    try {
      const success = await removeSingleWordFromStorage(payload);
      console.log("word was removed!");
    } catch (err) {
      console.log(err);
    }
  } else if (event.data.action === "MARK" && event.data.from === "WORD") {
    const { payload } = event.data;
    console.log("marking: ", payload);
    try {
      const success = await markWord(payload);
      console.log("word was removed!");
    } catch (err) {
      console.log(err);
    }
  }
});

const getWordsFromStorage = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["words"], function (result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      }
      if ("words" in result) {
        const words = result["words"];
        resolve(words);
      } else {
        let obj = {};
        obj["words"] = [];
        chrome.storage.local.set(obj, function () {
          resolve([]);
        });
      }
    });
  });
};

const getRandomWordFromStorage = async () => {
  return new Promise(async (resolve, reject) => {
    const words = await getWordsFromStorage();
    if (words.length === 0) {
      console.log("no words in storage");
      reject(false);
    }
    const length = words.length;
    const randomIndex = Math.floor(Math.random() * length);
    resolve(words[randomIndex]);
  });
};

const triggerInjection = () => {
  var randomNumber = Math.random();
  return randomNumber < 0.3;
};

const createAndInjectElement = async () => {
  const div = document.createElement("div");
  const randomWord = await getRandomWordFromStorage();
  if (randomWord) {
    console.log(randomWord);
    sessionStorage.setItem("wordObject", JSON.stringify(randomWord));

    try {
      document.body.style.position = "relative";
      const div = document.createElement("div");
      div.id = "react-anchor";
      const script = document.createElement("script");
      script.src =
        "chrome-extension://ebgphmifkdddclkolclgekikgfbcgene/lizard.js";
      document.body.appendChild(div);
      document.body.appendChild(script);
    } catch (error) {
      console.log(error);
    }
  }
};

if (triggerInjection()) {
  createAndInjectElement();
}
