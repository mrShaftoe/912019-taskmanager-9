
const BOARD_SORTINGS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];

const getSorting = function (caption) {
  return `<a href="#" class="board__filter">${caption}</a>`;
};

const getBoard = function () {
  return `<section class="board container">
      <div class="board__filter-list">
        ${BOARD_SORTINGS.map(getSorting).join(``)}
      </div>
      <div class="board__tasks">

      </div>
      <button class="load-more" type="button">load more</button>
    </section>
  `;
};

export {getBoard};
