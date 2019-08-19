import renderComponent from './render';
import {renderFilterList} from './board/filters';
import {renderTasks} from './board/tasks';
import {getLoadMoreButton} from './board/loadmorebutton';
import {renderEditCard} from './board/cards';

const renderBoard = function (container, data) {
  renderComponent(
      container,
      `<section class="board container"></section>`
  );
  const boardContainer = container.querySelector(`.board`);
  renderComponent(
      boardContainer,
      `<div class="board__tasks"></div>`
  );
  const boardTasks = container.querySelector(`.board__tasks`);
  renderEditCard(boardTasks, data[0]);
  renderTasks(boardTasks, data.slice(1, 8));
  renderComponent(boardContainer, getLoadMoreButton());
  renderFilterList(boardContainer);
};

export {renderBoard};
