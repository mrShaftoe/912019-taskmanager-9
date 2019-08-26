import {AbstractComponent} from './abstract-component';

class Control extends AbstractComponent {
  constructor({caption, text, isChecked = false}) {
    super();
    this._caption = caption;
    this._text = text;
    this._isChecked = isChecked;
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


