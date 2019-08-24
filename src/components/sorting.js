import {createElement} from '../utils';

class Sorting {
  constructor(caption) {
    this._caption = caption;
    this.element = null;
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
    return `<a href="#" class="board__filter">${this._caption}</a>`.trim();
  }
}

export {Sorting};
