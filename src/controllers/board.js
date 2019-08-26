import {Board} from "../components/board";
import {FiltersList} from "../components/filterslist";
import {BoardTasks} from "../components/boardtasks";
import {Task} from "../components/task";
import {NoTasks} from "../components/notasks";
import {TaskEdit} from "../components/taskedit";
import {render} from "../utils";

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
    this._tasks.forEach((taskMock) => this._renderTask(taskMock));
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
}

export {BoardController};
