import {Board} from "../components/board";
import {BoardTasks} from "../components/boardtasks";
import {NoTasks} from "../components/notasks";
import {Sort} from "../components/sorting";
import {render, deleteElement} from "../utils";
import {LoadMoreButton} from "../components/loadmore";
import {LOAD_MORE_TEXT, NO_TASKS_MESSAGE} from "../components/data";
import {TaskController} from "./taskcontroller";

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

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
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
    const taskController = new TaskController(this._boardTasks, taskMock, this._onDataChange, this._onChangeView);
    this._subscriptions.push(taskController.setDefaultView.bind(taskController));
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

  _renderBoard(tasks) {
    this._boardTasks.getElement().innerHTML = ``;
    tasks.slice(0, renderedCardsCount).forEach((taskMock) => this._renderTask(taskMock));
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

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._tasks[this._tasks.findIndex((it) => it === oldData)] = newData;
    this._sortedTasks[this._sortedTasks.findIndex((it) => it === oldData)] = newData;
    this._renderBoard(this._sortedTasks.slice(0, renderedCardsCount));
  }
}

export {BoardController};
