const getRandomInt = function (max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getShuffledArray = function (arr) {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 1; i--) {
    const j = getRandomInt(i + 1);
    [shuffled[j], shuffled[i]] = [shuffled[i], shuffled[j]];
  }
  return shuffled;
};

export {getRandomInt, getShuffledArray};
