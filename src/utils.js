const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

const deleteElement = function (elem) {
  unrender(elem.getElement());
  elem.removeElement();
};

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

export {getRandomInt, getShuffledArray, createElement, deleteElement, render, unrender};
