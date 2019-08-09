import renderComponent from './render.js';

const CONTROLS = [
  {
    caption: `new-task`,
    text: `+ add new task`
  },
  {
    caption: `task`,
    text: `tasks`,
    checked: true},
  {
    caption: `statistic`,
    text: `statisticts`}
];

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

const renderControlElements = function (container) {

  const controlContainer = container.querySelector(`.main__control`);

  renderComponent(
      controlContainer,
      `<section class="control__btn-wrap"></section>`
  );
  const controlsWrap = controlContainer.querySelector(`.control__btn-wrap`);
  CONTROLS.forEach(
      (it) => renderComponent(controlsWrap, getControlElement(it.caption, it.text, it.checked))
  );
};

export {renderControlElements};


