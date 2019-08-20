import renderComponent from './render';
import {renderSortingList} from './board/sorting';
import {renderTasks} from './board/tasks';
import {getLoadMoreButton} from './board/loadmorebutton';
import {renderEditCard} from './board/cards';

const renderBoard = function (container, tasksData) {
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
  renderEditCard(boardTasks, tasksData[0]);
  renderTasks(boardTasks, tasksData.slice(1, 8));
  renderComponent(boardContainer, getLoadMoreButton());
  renderSortingList(boardContainer);
};

export {renderBoard};
