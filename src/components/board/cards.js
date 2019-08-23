import renderComponent from '../render';

const CARD_CONTROLS = [`edit`, `archive`, `favorites`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

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

const renderCardControl = function (container, controls) {
  renderComponent(container, `<div class="card__control"></div>`);
  const cardControl = container.querySelector(`.card__control`);
  controls.forEach(
      (it) => renderComponent(cardControl, getCardControlButton(it))
  );
};

const getCardText = function (container, text) {
  renderComponent(
      container,
      `<div class="card__textarea-wrap">
        <p class="card__text">${text}</p>
      </div>`
  );
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

const renderHashtags = function (container, hashtags) {
  if (hashtags) {
    renderComponent(
        container,
        `<div class="card__hashtag">
          <div class="card__hashtag-list"></div>
        </div>`
    );
    const hastagsList = container.querySelector(`.card__hashtag-list`);
    hashtags.forEach(
        (it) => renderComponent(hastagsList, getHashtag(it))
    );
  }
};

const getDateTime = function (type, value) {
  const dateTime = type === `date` ?
    new Intl.DateTimeFormat(`en-GB`, {month: `long`, day: `numeric`}).format(value).toUpperCase() :
    new Intl.DateTimeFormat(`en-GB`, {hour: `2-digit`, minute: `2-digit`}).format(value);
  return `
    <span class="card__${type.toLowerCase()}">${dateTime}</span>
  `;
};

const renderCardDates = function (container, dueDate) {
  if (!dueDate) {
    return;
  }
  renderComponent(
      container,
      `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap"></p>
        </div>
      </div>`
  );
  const cardInput = container.querySelector(`.card__input-deadline-wrap`);


  if (dueDate) {
    renderComponent(
        cardInput,
        getDateTime(`date`, dueDate)
    );
    renderComponent(
        cardInput,
        getDateTime(`time`, dueDate)
    );
  }

};


const renderCardDetails = function (container, dueDate, hashtags) {
  renderComponent(
      container,
      `<div class="card__settings">
        <div class="card__details"></div>
      </div>`
  );
  const cardDetails = container.querySelector(`.card__details`);
  renderCardDates(cardDetails, dueDate);
  renderHashtags(cardDetails, hashtags);
};

const renderCard = function (container, {description, color, dueDate, repeatingDays, hashtags}) {
  renderComponent(
      container,
      `<article
        class="
          card
          card--${color}
          ${Object.keys(repeatingDays).some((it) => repeatingDays[it]) ? ` card--repeat` : ``}
          ${dueDate <= Date.now() ? ` card--deadline` : ``}
        ">
        <div class="card__form">
          <div class="card__inner"></div>
        </div>
      </article>`
  );
  const cards = container.querySelectorAll(`.card`);
  const card = cards[cards.length - 1];
  const cardInner = card.querySelector(`.card__inner`);
  renderCardControl(cardInner, CARD_CONTROLS);
  renderComponent(
      cardInner,
      `<div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>`
  );
  getCardText(cardInner, description);
  renderCardDetails(cardInner, dueDate, hashtags);
};

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

const renderEditCard = function (container, {description, dueDate, repeatingDays, color}) {
  renderComponent(
      container,
      `<article class="card card--edit card--${color}">
      <form class="card__form" method="get">
        <div class="card__inner"></div>
      </form>
      </article>`
  );
  const cardEdit = container.querySelector(`.card--edit .card__inner`);
  const isRepeating = Object.values(repeatingDays).some((it) => it);
  renderCardControl(cardEdit, CARD_CONTROLS.slice(1));
  renderComponent(
      cardEdit,
      `<div class="card__color-bar">
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
          >${description}</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">${dueDate ? `yes` : `no`}</span>
            </button>

            <fieldset class="card__date-deadline" ${dueDate ? `` : `disabled`}>
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
                ${getRepeatingDays(repeatingDays)}
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
            ${COLORS.map((it) => getColor(it, it === color)).join(` `)}
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>`
  );
};

export {renderCard, renderEditCard};

