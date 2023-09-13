const fetchDefinitions = async (selectedWord) => {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
    );
    if (!response.ok) {
      throw new Error("error loading definition");
    } else {
      const definition = await response.json();
      return definition;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// gets an wordObject and store it in storage
const storeWordObject = async (wordObject, allWords) => {
  return new Promise((resolve, reject) => {
    allWords.push(wordObject);
    let obj = {};
    obj["words"] = allWords;
    chrome.storage.local.set(obj, function () {
      console.log("saved!");
      resolve(true);
    });
  });
};

export const getWordsFromStorage = async () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["words"], function (result) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
      }
      if ("words" in result) {
        const words = result["words"];
        console.log("woords:", words);
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

export const handleUserRequest = async (selectedWordObject, tab) => {
  const selectedWord = selectedWordObject.selectionText;
  const definition = await fetchDefinitions(selectedWord);
  if (!definition) {
    return;
  } else {
    const wordObject = {
      text: selectedWord,
      definition,
      id: Math.random(),
      timestamp: Date.now(),
    };
    console.log(wordObject);
    const allwords = await getWordsFromStorage();
    await storeWordObject(wordObject, allwords);
  }
};
