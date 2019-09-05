import {Task} from "../components/task";
import {TaskEdit} from "../components/taskedit";
import {render, deleteElement} from "../utils";
import flatpickr from 'flatpickr';
import {Hashtag} from "../components/hashtag";

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

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

  _renderHashtag(name) {
    const hashtag = new Hashtag(name);
    hashtag.getElement().querySelector(`.card__hashtag-delete`)
      .addEventListener(`click`, () => {
        deleteElement(hashtag);
      });
    render(
        this._taskEdit.getElement().querySelector(`.card__hashtag-list`),
        hashtag.getElement(),
        `beforeend`
    );
  }

  create() {
    flatpickr(this._taskEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: Date.parse(this._taskMock.dueDate) ? this._taskMock.dueDate : 0,
    });

    const deadlineFieldset = this._taskEdit.getElement().querySelector(`.card__date-deadline`);
    const repeatFieldset = this._taskEdit.getElement().querySelector(`.card__repeat-days`);
    const favoriteButton = this._taskEdit.getElement().querySelector(`.card__btn--favorites`);
    const archiveButton = this._taskEdit.getElement().querySelector(`.card__btn--archive`);

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

    const onEscKeyPress = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        closeTaskEdit(evt);
      }
    };

    this._taskEdit.getElement().querySelector(`.card__form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
    });

    this._taskEdit.getHashtags().forEach((it) => this._renderHashtag(it));

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
        const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));
        const entry = {
          description: formData.get(`text`),
          dueDate: deadlineFieldset.disabled ? 0 : new Date(formData.get(`date`)),
          hashtags: new Set(formData.getAll(`hashtag`)),
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
          }),
          isFavorite: !favoriteButton.classList.contains(`card__btn--disabled`),
          isArchive: !favoriteButton.classList.contains(`card__btn--disabled`),
        };
        this._onDataChange(entry, this._taskMock);
        evt.preventDefault();
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
        switch (repeatFieldset.disabled) {
          case true:
            repeatFieldset.disabled = false;
            repeatStatus.innerText = `Yes`;
            this._taskEdit.getElement().classList.add(`card--repeat`);
            break;
          case false:
            repeatFieldset.disabled = true;
            repeatStatus.innerText = `No`;
            this._taskEdit.getElement().classList.remove(`card--repeat`);
            break;
        }

      });

    this._taskEdit.getElement().querySelector(`.card__form`)
      .addEventListener(`change`, (evt) => {
        evt.preventDefault();
        if (evt.target.classList.contains(`card__color-input`)) {
          COLORS.forEach((it) => {
            if (this._taskEdit.getElement().classList.contains(`card--${it}`)) {
              this._taskEdit.getElement().classList.remove(`card--${it}`);
            }
          });
          this._taskEdit.getElement().classList.add(`card--${evt.target.value}`);
        }
      });

    this._taskEdit.getElement().querySelector(`.card__hashtag-input`)
      .addEventListener(`keydown`, (evt) => {
        if (evt.key === `Enter`) {
          evt.preventDefault();
          if (evt.target.value) {
            this._renderHashtag(evt.target.value);
            evt.target.value = null;
          }
        }
      });

    favoriteButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      favoriteButton.classList.toggle(`card__btn--disabled`);
    });

    archiveButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      archiveButton.classList.toggle(`card__btn--disabled`);
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
