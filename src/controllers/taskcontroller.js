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
      defaultDate: Date.parse(this._taskMock.dueDate) ? this._taskMock.dueDate : 0,
    });

    const deadlineFieldset = this._taskEdit.getElement().querySelector(`.card__date-deadline`);
    const repeatFieldset = this._taskEdit.getElement().querySelector(`.card__repeat-days`);
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
          dueDate: deadlineFieldset.disabled ? 0 : new Date(formData.get(`date`)),
          hashtags: new Set(formData.getAll(`hashtag`)),
          color: formData.get(`color`),
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = repeatFieldset.disabled ? false : true;
            return acc;
          }, {
            mo: false,
            tu: false,
            we: false,
            th: false,
            fr: false,
            sa: false,
            su: false,
          }),
          isFavorite: this._taskMock.isFavorite,
          isArchive: this._taskMock.isArchive,
        };
        this._onDataChange(entry, this._taskMock);
        document.removeEventListener(`keydown`, onEscKeyPress);
      });

    this._taskEdit.getElement().querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const dateStatus = this._taskEdit.getElement().querySelector(`.card__date-status`);
        switch (deadlineFieldset.disabled) {
          case true:
            dateStatus.innerText = `YES`;
            deadlineFieldset.disabled = false;
            break;
          case false:
            dateStatus.innerText = `NO`;
            deadlineFieldset.disabled = true;
            break;
        }
      });

    this._taskEdit.getElement().querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();
        const repeatStatus = this._taskEdit.getElement().querySelector(`.card__repeat-status`);
        repeatFieldset.disabled = repeatFieldset.disabled ? false : true;
        repeatStatus.innerText = repeatFieldset.disabled ? `no` : `yes`;

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
