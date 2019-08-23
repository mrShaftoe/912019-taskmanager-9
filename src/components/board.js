import {getTask, getTaskEdit} from './task';

const BOARD_SORTINGS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];

const getSorting = function (caption) {
  return `<a href="#" class="board__filter">${caption}</a>`;
};

const getTasks = function (tasksData) {
  return tasksData.map(getTask).join(``);
};

const getBoard = function (tasksData) {
  return `
    <section class="board container">
      <div class="board__filter-list">
        ${BOARD_SORTINGS.map(getSorting).join(``)}
      </div>
      <div class="board__tasks">
        ${getTaskEdit(tasksData[0])}
        ${getTasks(tasksData.slice(1))}
      </div>
      <button class="load-more" type="button">load more</button>
    </section>
  `;
};

export {getBoard, getTasks};
