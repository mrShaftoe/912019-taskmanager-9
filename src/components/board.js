import renderComponent from './render';
import {renderFilterList} from './board/filters';
import {renderTasks} from './board/tasks';
import {getLoadMoreButton} from './board/loadmorebutton';

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
