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

export const removeSingleWordFromStorage = async (wordId) => {
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

export const getWordsFromStorage = async () => {
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

export const getRandomWordFromStorage = async () => {
  const words = await getWordsFromStorage();
  const length = words.length;
  const randomIndex = Math.floor(Math.random() * length);
  if (words[randomIndex]) {
    return words[randomIndex];
  } else {
    return null;
  }
};

export const handleUserRequest = async (selectedWordObject, tab) => {
  console.log(selectedWordObject);
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
      marked: false,
    };
    const allwords = await getWordsFromStorage();
    await storeWordObject(wordObject, allwords);
  }
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const markWord = async (wordId) => {
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

export const getQuestion = async () => {
  const randomWord = await getRandomWordFromStorage();
  const words = await getWordsFromStorage();
  if (words.length < 3) {
    return null;
  }
  const filteredWords = words.filter((word) => word.id !== randomWord.id);
  const index1 = Math.floor(Math.random() * filteredWords.length);
  let index2 = (index1 + 1) % filteredWords.length;

  return {
    word: randomWord.text,
    options: {
      one: filteredWords[index1],
      two: filteredWords[index2],
      answer: randomWord,
    },
  };
  // now get two other words from storage
  // return and object {word:x, options:[1,2,3]}
};
