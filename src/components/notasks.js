import {createElement} from '../utils';

class NoTasks {
  constructor(message) {
    this._message = message;
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
    return `<p class="board__no-tasks">${this._message}</p>`.trim();
  }
}

export {NoTasks};
