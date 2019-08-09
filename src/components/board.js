import renderComponent from './render.js';
import {renderFilterList} from './board/filters.js';
import {renderTasks} from './board/tasks.js';
import {getLoadMoreButton} from './board/loadmorebutton.js';

const renderBoard = function (container) {
  renderComponent(
      container,
      `<section class="board container"></section>`
  );
  const boardContainer = container.querySelector(`.board`);

  renderFilterList(boardContainer);
  renderTasks(boardContainer);
  renderComponent(boardContainer, getLoadMoreButton());
};

export {renderBoard};
