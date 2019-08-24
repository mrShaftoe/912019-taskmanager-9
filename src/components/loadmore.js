import {createElement} from '../utils';

class LoadMoreButton {
  constructor(buttonText) {
    this._buttonText = buttonText;
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
    return `<button class="load-more" type="button">${this._buttonText}</button>`.trim();
  }
}

export {LoadMoreButton};
