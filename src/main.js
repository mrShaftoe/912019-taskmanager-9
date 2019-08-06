"use strict";
const CONTROLS = [
  [`new-task`, `+ add new task`],
  [`task`, `tasks`, true],
  [`statistic`, `statisticts`]
];
const main = document.querySelector(`.main`);

const getControlElement = function (caption, text, isChecked = false) {
  return `
    <input
        type="radio"
        name="control"
        id="control__${caption.toLowerCase()}"
        class="control__input visually-hidden"
        ${isChecked ? `checked` : ``}
    />
    <label
      for="control__${caption}"
      class="control__label control__label--${caption.toLowerCase()}
    ">${text.toUpperCase()}</label>
  `;
};

const getControlElements = function () {
  const mainControl = main.querySelector(`.main__control`);
  const controlBtnWrap = document.createElement(`section`);
  controlBtnWrap.classList.add(`control__btn-wrap`);
  CONTROLS.forEach(
      (it) => controlBtnWrap.insertAdjacentHTML(`beforeend`, getControlElement(...it))
  );
  mainControl.appendChild(controlBtnWrap);
};
getControlElements();
