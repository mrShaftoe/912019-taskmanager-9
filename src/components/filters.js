import {AbstractComponent} from './abstract-component';

class Filter extends AbstractComponent {
  constructor({caption, value, isChecked}) {
    super();
    this._caption = caption;
    this._value = value;
    this._isChecked = isChecked;
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
