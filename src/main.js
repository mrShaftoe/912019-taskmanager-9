"use strict";

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

console.log(getControlElement(`new-task`, `+ add new task`));


