import {getCardControls} from './task';
import {createElement} from '../utils';

const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const getRepeatingDay = function (dayName, isRepeating) {
  return `
    <input
      class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${dayName.toLowerCase()}-1"
        name="repeat"
        value="${dayName.toLowerCase()}"
        ${isRepeating ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${dayName.toLowerCase()}-1"
        >${dayName}</label
      >`;
};

const getRepeatingDays = function (repeatingDays) {
  return Object.keys(repeatingDays).map((it) => getRepeatingDay(it, repeatingDays[it])).join(``);
};

const getColor = function (color, isChecked) {
  return `
    <input
      type="radio"
      id="color-${color}-1"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${isChecked ? `checked` : ``}
    />
    <label
      for="color-${color}-1"
      class="card__color card__color--${color}"
      >${color}</label
    >`;
};

class TaskEdit {
  constructor({color, description, dueDate, hashtags, repeatingDays}) {
    this._color = color;
    this._description = description;
    this._dueDate = dueDate;
    this._hashtags = hashtags;
    this._repeatingDays = repeatingDays;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    const isRepeating = Object.values(this._repeatingDays).some((it) => it);
    return `<article class="card card--edit card--${this._color}${isRepeating ? ` card--repeat` : ``}${this._dueDate <= Date.now() ? ` card--deadline` : ``}">
        <form class="card__form" method="get">
          <div class="card__inner">
            ${getCardControls(1)}

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${this._description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__date-deadline" ${this._dueDate ? `` : `disabled`}>
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder="23 September"
                        name="date"
                      />
                    </label>
                  </fieldset>

                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days" ${isRepeating ? `` : `disabled`}>
                    <div class="card__repeat-days-inner">
                      ${getRepeatingDays(this._repeatingDays)}
                    </div>
                  </fieldset>
                </div>

                <div class="card__hashtag">
                  <div class="card__hashtag-list"></div>

                  <label>
                    <input
                      type="text"
                      class="card__hashtag-input"
                      name="hashtag-input"
                      placeholder="Type new hashtag here"
                    />
                  </label>
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>
                <div class="card__colors-wrap">
                  ${COLORS.map((it) => getColor(it, it === this._color)).join(` `)}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>`;
  }
}

export {TaskEdit};
