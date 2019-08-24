import {createElement} from '../utils';

class Filter {
  constructor({caption, value, isChecked}) {
    this._caption = caption;
    this._value = value;
    this._isChecked = isChecked;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<div>
      <input
        type="radio"
        id="filter__${this._caption.toLowerCase()}"
        class="filter__input visually-hidden"
        name="filter"
        ${this._isChecked ? `checked` : ``}
        ${this._value === 0 ? `disabled` : ``}
      />
      <label for="filter__all" class="filter__label">
        ${this._caption}
        <span class="filter__${this._caption.toLowerCase()}-count">${this._value}</span>
      </label>
    </div>
  `.trim();
  }
}

export {Filter};
