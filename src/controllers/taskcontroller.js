import {Task} from "../components/task";
import {TaskEdit} from "../components/taskedit";
import {render} from "../utils";
import flatpickr from 'flatpickr';

class TaskController {
  constructor(container, taskMock, onDataChange, onChangeView) {
    this._container = container;
    this._taskMock = taskMock;
    this._taskView = new Task(taskMock);
    this._taskEdit = new TaskEdit(taskMock);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this.create();
  }

  create() {
    flatpickr(this._taskEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._taskMock.dueDate
    });

    const openTaskEdit = (evt) => {
      evt.preventDefault();
      this._onChangeView();
      this._container.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());
      document.addEventListener(`keydown`, onEscKeyPress);
    };

    const closeTaskEdit = () => {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
      document.removeEventListener(`keydown`, onEscKeyPress);
    };

    const onEscKeyPress = function (evt) {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeTaskEdit(evt);
      }
    };

    this._taskView.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, openTaskEdit);

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyPress);
      });

    this._taskEdit.getElement().querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyPress);
      });

    this._taskEdit.getElement().querySelector(`.card__form`)
      .addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
        const entry = {
          description: formData.get(`text`),
          dueDate: new Date(formData.get(`date`)),
          tags: new Set(formData.getAll(`hashtag`)),
          color: formData.get(`color`),
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, {
            mo: false,
            tu: false,
            we: false,
            th: false,
            fr: false,
            sa: false,
            su: false,
          })
        };
        this._onDataChange(entry, this._taskMock);


        document.removeEventListener(`keydown`, onEscKeyPress);
      });

    render(this._container.getElement(), this._taskView.getElement(), `beforeend`);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._taskEdit.getElement())) {
      this._container.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}

export {TaskController};
