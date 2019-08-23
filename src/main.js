import renderComponent from '../src/components/render';
import {renderControlElements} from '../src/components/control';
import {getSearchElement} from '../src/components/search';
import {getFiltersData} from '../src/components/filtersdata';
import {renderFilterElements} from '../src/components/filters';
import {getBoard, getTasks} from '../src/components/board';
import {getTaskData} from './components/data.js';

const CARD_SHOWN_ONCE = 8;
const main = document.querySelector(`.main`);
const tasks = Array.from({length: 30}, getTaskData);

renderControlElements(main);
renderComponent(main, getSearchElement());
renderFilterElements(main, getFiltersData(tasks));
renderComponent(main, getBoard(tasks.slice(0, CARD_SHOWN_ONCE)));

let renderedCardsCount = 8;

const loadMoreButton = main.querySelector(`.load-more`);
const boardTasks = main.querySelector(`.board__tasks`);

loadMoreButton.addEventListener(`click`, function (evt) {
  evt.preventDefault();

  const startIndex = renderedCardsCount;
  if (startIndex >= tasks.length) {
    loadMoreButton.remove();
    return;
  }
  const endIndex = (startIndex + CARD_SHOWN_ONCE) < tasks.length ? startIndex + CARD_SHOWN_ONCE : tasks.length;

  if (endIndex >= tasks.length - 1) {
    loadMoreButton.remove();
  }

  renderComponent(boardTasks, getTasks(tasks.slice(startIndex, endIndex)));
  renderedCardsCount += endIndex - startIndex;
});


