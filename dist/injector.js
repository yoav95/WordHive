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

const body = document.body;

const triggerInjection = () => {
  var randomNumber = Math.random();
  return randomNumber < 0.5;
};

const createAndInjectElement = async () => {
  const div = document.createElement("div");
  const randomWord = await getRandomWordFromStorage();
  if (randomWord) {
    console.log(randomWord);
  }
};

if (triggerInjection()) {
  createAndInjectElement();
}
