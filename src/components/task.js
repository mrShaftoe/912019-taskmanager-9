import {AbstractComponent} from './abstract-component';

const CARD_CONTROLS = [`edit`, `archive`, `favorites`];

const getCardControlButton = function (caption) {

  return `
      <button
        type="button"
        class="
        card__btn card__btn--${caption.toLowerCase()}
        ${caption === `favorites` ? ` card__btn--disabled` : ``}"
      >
      ${caption.toLowerCase()}
      </button>
  `;
};

const getCardControls = function (startIndex) {
  return `
    <div class="card__control">
      ${CARD_CONTROLS.slice(startIndex).map(getCardControlButton).join(``)}
    </div>
  `;
};

const getDateOrTime = function (type, value) {
  const dateTime = type === `date` ?
    new Intl.DateTimeFormat(`en-GB`, {month: `long`, day: `numeric`}).format(value).toUpperCase() :
    new Intl.DateTimeFormat(`en-GB`, {hour: `2-digit`, minute: `2-digit`}).format(value);
  return `
    <span class="card__${type.toLowerCase()}">${dateTime}</span>
  `;
};

const getCardDeadline = function (dueDate) {
  return `
    <div class="card__dates">
      <div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          ${getDateOrTime(`date`, dueDate)}
          ${getDateOrTime(`time`, dueDate)}
        </p>
      </div>
    </div>
  `;
};

const getHashtag = function (name) {
  return `
    <span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${name.toLowerCase()}
      </span>
    </span>
  `;
};

const getHashtags = function (hashtags) {
  return `
    <div class="card__hashtag">
      <div class="card__hashtag-list">
        ${Array.from(hashtags).map(getHashtag).join(``)}
      </div>
    </div>
  `;
};

class Task extends AbstractComponent {
  constructor({color, description, dueDate, hashtags, repeatingDays}) {
    super();
    this._color = color;
    this._description = description;
    this._dueDate = dueDate;
    this._hashtags = hashtags;
    this._repeatingDays = repeatingDays;
  }

  getTemplate() {
    const isRepeating = Object.values(this._repeatingDays).some((it) => it);
    return `<article class="card card--${this._color}${isRepeating ? ` card--repeat` : ``}${this._dueDate <= Date.now() ? ` card--deadline` : ``}">
        <div class="card__form">
          <div class="card__inner">
            ${getCardControls(0)}

            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <p class="card__text">${this._description}</p>
            </div>

            <div class="card__settings">
              <div class="card__details">
                ${this._dueDate && Date.parse(this._dueDate) ? getCardDeadline(this._dueDate) : `` }
                ${this._hashtags ? getHashtags(this._hashtags) : ``}
              </div>
            </div>
          </div>
        </div>
      </article>`;
  }
}

export {getCardControls, Task};
