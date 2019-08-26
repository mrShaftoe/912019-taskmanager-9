import {AbstractComponent} from './abstract-component';

class Sort extends AbstractComponent {
  _getSortItem(caption) {
    return `<a href="#" class="board__filter">${caption}</a>`.trim();
  }

  getTemplate() {
    return `
      <div class="board__filter-list">
        <a href="#" data-sort-type="default" class="board__filter">SORT BY DEFAULT</a>
        <a href="#" data-sort-type="date-up" class="board__filter">SORT BY DATE up</a>
        <a href="#" data-sort-type="date-down" class="board__filter">SORT BY DATE down</a>
      </div>
    `.trim();
  }
}

export {Sort};
