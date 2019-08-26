import {Board} from "../components/board";
import {FiltersList} from "../components/filterslist";
import {BoardTasks} from "../components/boardtasks";
import {Task} from "../components/task";
import {NoTasks} from "../components/notasks";
import {TaskEdit} from "../components/taskedit";
import {Sorting} from "../components/sorting";
import {render, deleteElement} from "../utils";
import {LoadMoreButton} from "../components/loadmore";
import {LOAD_MORE_TEXT, NO_TASKS_MESSAGE, SORTINGS} from "../components/data";

const TASKS_SHOWN_ONCE = 8;
let renderedCardsCount = TASKS_SHOWN_ONCE;

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._filtersList = new FiltersList();
    this._boardTasks = new BoardTasks();
  }

  init() {
    render(this._container, this._board.getElement(), `beforeend`);
    render(this._board.getElement(), this._filtersList.getElement(), `beforeend`);
    render(this._board.getElement(), this._boardTasks.getElement(), `beforeend`);

    if (!this._tasks.length || this._tasks.every(({isArchive}) => isArchive)) {
      this._renderNoTasks(NO_TASKS_MESSAGE);
      return;
    }

    SORTINGS.forEach((sortingMock) => this._renderSorting(sortingMock));
    this._tasks.slice(0, TASKS_SHOWN_ONCE).forEach((taskMock) => this._renderTask(taskMock));
    this._renderLoadMoreButton(LOAD_MORE_TEXT);
  }

  _renderTask(taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock, this._tasks.indexOf(taskMock));

    const openTaskEdit = () => {
      this._boardTasks.getElement().replaceChild(taskEdit.getElement(), task.getElement());
      document.addEventListener(`keydown`, onEscKeyPress);
    };

    const closeTaskEdit = (evt) => {
      evt.preventDefault();
      this._boardTasks.getElement().replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyPress);
    };

    const onEscKeyPress = function (evt) {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeTaskEdit(evt);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, openTaskEdit);

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyPress);
      });

    taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyPress);
      });

    taskEdit.getElement().querySelector(`.card__form`)
      .addEventListener(`submit`, closeTaskEdit);

    render(this._boardTasks.getElement(), task.getElement(), `beforeend`);
  }

  _renderSorting(sortingMock) {
    const sorting = new Sorting(sortingMock);
    render(
        this._filtersList.getElement(),
        sorting.getElement(),
        `beforeend`
    );
  }

  _renderLoadMoreButton(loadMoreMock) {
    if (renderedCardsCount >= this._tasks.length) {
      return;
    }

    const loadMoreButton = new LoadMoreButton(loadMoreMock);

    loadMoreButton.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const startIndex = renderedCardsCount;
      if (startIndex >= this._tasks.length) {
        deleteElement(loadMoreButton);
        return;
      }

      const endIndex = (startIndex + TASKS_SHOWN_ONCE) < this._tasks.length ? startIndex + TASKS_SHOWN_ONCE : this._tasks.length;

      if (endIndex >= this._tasks.length - 1) {
        deleteElement(loadMoreButton);

      }
      this._tasks.slice(startIndex, endIndex).forEach((taskMock) => this._renderTask(taskMock));
      renderedCardsCount += endIndex - startIndex;
    });

    render(
        this._container.querySelector(`.board`),
        loadMoreButton.getElement(),
        `beforeend`
    );
  }

  _renderNoTasks(noTasksMock) {
    const noTasksMessage = new NoTasks(noTasksMock);
    this._board.getElement().innerHTML = ``;
    render(this._board.getElement(), noTasksMessage.getElement(), `afterbegin`);
  }
}

export {BoardController};
