import {AbstractComponent} from './abstract-component';

class Sorting extends AbstractComponent {
  constructor(caption) {
    super();
    this._caption = caption;
    this.element = null;
  }

  getTemplate() {
    return `<a href="#" class="board__filter">${this._caption}</a>`.trim();
  }
}

export {Sorting};
