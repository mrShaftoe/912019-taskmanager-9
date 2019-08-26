import {Board} from "../components/board";
import {BoardTasks} from "../components/boardtasks";
import {Task} from "../components/task";
import {NoTasks} from "../components/notasks";
import {TaskEdit} from "../components/taskedit";
import {Sort} from "../components/sorting";
import {render, deleteElement} from "../utils";
import {LoadMoreButton} from "../components/loadmore";
import {LOAD_MORE_TEXT, NO_TASKS_MESSAGE} from "../components/data";

const TASKS_SHOWN_ONCE = 8;
let renderedCardsCount = TASKS_SHOWN_ONCE;

class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._sortedTasks = tasks.slice();
    this._board = new Board();
    this._boardTasks = new BoardTasks();
    this._sort = new Sort();
  }

  init() {
    render(this._container, this._board.getElement(), `beforeend`);
    render(this._board.getElement(), this._boardTasks.getElement(), `beforeend`);

    if (!this._tasks.length || this._tasks.every(({isArchive}) => isArchive)) {
      this._renderNoTasks(NO_TASKS_MESSAGE);
      return;
    }

    render(this._board.getElement(), this._sort.getElement(), `afterbegin`);
    this._tasks.slice(0, TASKS_SHOWN_ONCE).forEach((taskMock) => this._renderTask(taskMock));
    this._renderLoadMoreButton(LOAD_MORE_TEXT);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortClickEvent(evt));
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

      this._sortedTasks.slice(startIndex, endIndex).forEach((taskMock) => this._renderTask(taskMock));
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

  _onSortClickEvent(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._boardTasks.getElement().innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date-up`:
        this._sortedTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case `date-down`:
        this._sortedTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      case `default`:
        this._sortedTasks = this._tasks.slice();
        break;
    }
    this._sortedTasks.slice(0, renderedCardsCount).forEach((taskMock) => this._renderTask(taskMock));
  }
}

export {BoardController};
