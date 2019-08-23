import {Control} from '../src/components/control';
import {Search} from '../src/components/search';
import {Filter} from '../src/components/filters';
import {getBoard} from '../src/components/board';
import {getTaskData, getFiltersData, CONTROLS, SEARCH_PLACEHOLDER} from './components/data.js';
import {Task} from './components/task';
import {TaskEdit} from './components/taskedit';
import {render, createElement} from './utils';

const CARD_SHOWN_ONCE = 8;
const main = document.querySelector(`.main`);
const tasks = Array.from({length: 30}, getTaskData);

const renderTask = function (taskMock) {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const onEscKeyPress = function (evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tasksContainer.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyPress);
    }
  };
  task.getElement()
    .querySelector(`.card__btn--edit`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyPress);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyPress);
    });

  taskEdit.getElement().querySelector(`textarea`)
    .addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyPress);
    });

  taskEdit.getElement().querySelector(`.card__save`)
    .addEventListener(`click`, () => {
      tasksContainer.replaceChild(taskEdit.getElement(), task.getElement());
      document.removeEventListener(`keydown`, onEscKeyPress);
    });

  render(tasksContainer, task.getElement(), `beforeend`);
};

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
render(main, createElement(getBoard()), `beforeend`);

let renderedCardsCount = 8;

const loadMoreButton = main.querySelector(`.load-more`);
const tasksContainer = main.querySelector(`.board__tasks`);

tasks.slice(0, CARD_SHOWN_ONCE).forEach(renderTask);

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
  tasks.slice(startIndex, endIndex).forEach(renderTask);
  renderedCardsCount += endIndex - startIndex;
});


