import renderComponent from '../render';

const BOARD_SORTINGS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];

const getSorting = function (caption) {
  return `<a href="#" class="board__filter">${caption}</a>`;
};

const renderSortingList = function (container) {
  container.insertAdjacentHTML(
      `afterbegin`,
      `<div class="board__filter-list"></div>`
  );
  const boardSortingList = container.querySelector(`.board__filter-list`);
  BOARD_SORTINGS.forEach(
      (it) => renderComponent(boardSortingList, getSorting(it))
  );
};

export {renderSortingList};
