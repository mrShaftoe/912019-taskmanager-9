import {getTaskData, getFiltersData, CONTROLS, SEARCH_PLACEHOLDER} from './components/data.js';
import {Control} from './components/control';
import {Search} from './components/search';
import {Filter} from './components/filters';
import {render, createElement} from './utils';
import {BoardController} from './controllers/board.js';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

const main = document.querySelector(`.main`);
const tasks = Array.from({length: 30}, getTaskData);


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

const boardController = new BoardController(main, tasks);
boardController.init();

