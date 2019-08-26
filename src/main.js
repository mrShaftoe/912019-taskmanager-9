import {getTaskData, getFiltersData, CONTROLS, SEARCH_PLACEHOLDER, SORTINGS, LOAD_MORE_TEXT, NO_TASKS_MESSAGE} from './components/data.js';
import {Control} from './components/control';
import {Search} from './components/search';
import {Filter} from './components/filters';
import {LoadMoreButton} from './components/loadmore';
import {Sorting} from './components/sorting';
import {NoTasks} from './components/notasks';
import {render, unrender, createElement, deleteElement} from './utils';
import {BoardController} from './controllers/board.js';

const CARD_SHOWN_ONCE = 8;
const main = document.querySelector(`.main`);
const tasks = Array.from({length: 30}, getTaskData);
let renderedCardsCount = CARD_SHOWN_ONCE;

const renderControl = function (controlMock) {
  const control = new Control(controlMock);
  Array.from(control.getElement().children).forEach((it) =>
    render(
        main.querySelector(`.control__btn-wrap`),
        it,
        `beforeend`
    )
  );
};

const renderSearch = function (searchText) {
  const search = new Search(searchText);
  render(main, search.getElement(), `beforeend`);
};

const renderFilter = function (filterMock) {
  const filter = new Filter(filterMock);
  Array.from(filter.getElement().children).forEach((it) =>
    render(
        main.querySelector(`.main__filter`),
        it,
        `beforeend`
    )
  );
};

const renderSorting = function (sortingMock) {
  const sorting = new Sorting(sortingMock);
  render(
      main.querySelector(`.board__filter-list`),
      sorting.getElement(),
      `beforeend`
  );
};

const renderLoadMoreButton = function (loadMoreMock) {
  if (renderedCardsCount >= tasks.length) {
    return;
  }

  const loadMoreButton = new LoadMoreButton(loadMoreMock);

  loadMoreButton.getElement().addEventListener(`click`, function (evt) {
    evt.preventDefault();

    const startIndex = renderedCardsCount;
    if (startIndex >= tasks.length) {
      unrender(loadMoreButton.getElement());
      return;
    }

    const endIndex = (startIndex + CARD_SHOWN_ONCE) < tasks.length ? startIndex + CARD_SHOWN_ONCE : tasks.length;

    if (endIndex >= tasks.length - 1) {
      deleteElement(loadMoreButton);

    }
    tasks.slice(startIndex, endIndex).forEach(renderTask);
    renderedCardsCount += endIndex - startIndex;
  });

  render(
      main.querySelector(`.board`),
      loadMoreButton.getElement(),
      `beforeend`
  );
};

const renderNoTasks = function (noTasksMock) {
  const noTasksMessage = new NoTasks(noTasksMock);
  const board = main.querySelector(`.board`);
  board.innerHTML = ``;
  render(board, noTasksMessage.getElement(), `afterbegin`);
};

render(
    main.querySelector(`.main__control`),
    createElement(`<section class="control__btn-wrap"></section>`),
    `beforeend`
);
CONTROLS.forEach(renderControl);

renderSearch(SEARCH_PLACEHOLDER);

render(
    main,
    createElement(`<section class="main__filter filter container"></section>`),
    `beforeend`
);
getFiltersData(tasks).forEach(renderFilter);

const boardController = new BoardController(main, tasks);
boardController.init();

// if (!tasks.length || tasks.every(({isArchive}) => isArchive)) {
//   renderNoTasks(NO_TASKS_MESSAGE);
// } else {
//   SORTINGS.forEach(renderSorting);
//   renderLoadMoreButton(LOAD_MORE_TEXT);
//   tasks.slice(0, CARD_SHOWN_ONCE).forEach(renderTask);
// }

