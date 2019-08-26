import {AbstractComponent} from './abstract-component';

class FiltersList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="board__filter-list"></div>`.trim();
  }
}

export {FiltersList};
