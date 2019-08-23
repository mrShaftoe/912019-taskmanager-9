import {createElement} from '../utils';

class Control {
  constructor({caption, text, isChecked = false}) {
    this._caption = caption;
    this._text = text;
    this._isChecked = isChecked;
    this._elem = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  getTemplate() {
    return `<div>
      <input
        type="radio"
        name="control"
        id="control__${this._caption.toLowerCase()}"
        class="control__input visually-hidden"
        ${this._isChecked ? `checked` : ``}
      />
      <label
        for="control__${this._caption.toLowerCase()}"
        class="control__label control__label--${this._caption.toLowerCase()}
      ">${this._text.toUpperCase()}</label>
    </div>`;
  }
}

export {Control};


