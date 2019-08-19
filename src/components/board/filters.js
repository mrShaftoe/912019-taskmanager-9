import renderComponent from '../render';

const BOARD_FILTERS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];

const getFilter = function (caption) {
  return `<a href="#" class="board__filter">${caption}</a>`;
};

const renderFilterList = function (container) {
  container.insertAdjacentHTML(
      `afterbegin`,
      `<div class="board__filter-list"></div>`
  );
  const boardFilterList = container.querySelector(`.board__filter-list`);
  BOARD_FILTERS.forEach(
      (it) => renderComponent(boardFilterList, getFilter(it))
  );
};

export {renderFilterList};