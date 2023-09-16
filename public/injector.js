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
  return randomNumber < 0.5;
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
