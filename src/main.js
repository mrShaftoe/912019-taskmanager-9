import renderComponent from '../src/components/render';
import {renderControlElements} from '../src/components/control';
import {getSearchElement} from '../src/components/search';
import {renderFilterElements} from '../src/components/filters';
import {renderBoard} from '../src/components/board';
import {renderTasks} from '../src/components/board/tasks';
import {getTask} from './components/data.js';

const CARD_SHOWN_ONCE = 8;
const main = document.querySelector(`.main`);
const tasks = [];
for (let i = 0; i < 30; i++) {
  tasks.push(getTask());
}

renderControlElements(main);
renderComponent(main, getSearchElement());
renderFilterElements(main, tasks);
renderBoard(main, tasks);

const loadMoreButton = main.querySelector(`.load-more`);
const boardTasks = main.querySelector(`.board__tasks`);

loadMoreButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();
  const renderedTasks = boardTasks.querySelectorAll(`.card`);
  if (!renderedTasks) {
    loadMoreButton.remove();
    return;
  }
  const startIndex = renderedTasks.length;
  const endIndex = (startIndex + CARD_SHOWN_ONCE) < tasks.length ? startIndex + CARD_SHOWN_ONCE : tasks.length - 1;
  if (startIndex >= tasks.length) {
    loadMoreButton.remove();
    return;
  }

  if (endIndex >= tasks.length - 1) {
    loadMoreButton.remove();
  }

  renderTasks(boardTasks, tasks.slice(startIndex, endIndex));
});
