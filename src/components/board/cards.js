import renderComponent from '../render';

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
    new Date(value).toLocaleDateString(`en`, {day: `numeric`, month: `long`}).toUpperCase().split(` `).reverse().join(` `) :
    (new Date(value).toLocaleTimeString(`en`, {hour12: false, hours: `2-digit`, minutes: `2-digit`})).split(`:`).slice(0, 2).join(`:`);
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

const renderEditCard = function (container, {description, dueDate, repeatingDays}) {
  renderComponent(
      container,
      `<article class="card card--edit card--black">
      <form class="card__form" method="get">
        <div class="card__inner"></div>
      </form>
      </article>`
  );
  const cardEdit = container.querySelector(`.card--edit .card__inner`);
  const isRepeating = Object.keys(repeatingDays).some((it) => repeatingDays[it]);
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
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-1"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-1"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-1"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-1"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-1"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-1"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-1"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-1"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-1"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-1"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-1"
                />
                <label class="card__repeat-day" for="repeat-sa-1"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-1"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-1"
                  >su</label
                >
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
            <input
              type="radio"
              id="color-black-1"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
              checked
            />
            <label
              for="color-black-1"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-1"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
            />
            <label
              for="color-yellow-1"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-1"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
            />
            <label
              for="color-blue-1"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-1"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
            />
            <label
              for="color-green-1"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-1"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
            />
            <label
              for="color-pink-1"
              class="card__color card__color--pink"
              >pink</label
            >
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

