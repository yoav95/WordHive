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
