"use strict";
const CONTROLS = [
  {
    caption: `new-task`,
    text: `+ add new task`
  },
  {
    caption: `task`,
    text: `tasks`,
    checked: true},
  {
    caption: `statistic`,
    text: `statisticts`}
];
const FILTERS = [
  {
    caption: `All`,
    value: 13,
    checked: true
  },
  {
    caption: `Overdue`,
    value: 0
  },
  {
    caption: `Today`,
    value: 0,
  },
  {
    caption: `Favorites`,
    value: 1
  },
  {
    caption: `Repeating`,
    value: 1
  },
  {
    caption: `Tags`,
    value: 1
  },
  {
    caption: `Archive`,
    value: 115
  }
];
const BOARD_FILTERS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];
const CARD_CONTROLS = [`edit`, `archive`, `favorites`];
const CARDS_DATA = [
  {
    text: `Example default task with default color.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
  },
  {
    color: `blue`,
    text: `Example default task with custom color.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
  },
  {
    color: `yellow`,
    text: `Example default task with custom color and without date.`,
    hashtags: [`todo`, `personal`, `important`],
  },
  {
    color: `green`,
    text: `Example default task with custom color and without hashtags.`,
    date: `23 September`,
    time: `11:15 PM`
  },
  {
    text: `Example default task without date and hashtags.`,
  },
  {
    color: `pink`,
    text: `It is example of repeating task. It marks by wave.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
    repeat: true
  },
  {
    color: `red`,
    text: `This is card with missing deadline.`,
    deadline: true
  },
  {
    text: `This is card with missing deadline. Deadline always marked by red line.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
    repeat: false,
    deadline: true
  }
];

const main = document.querySelector(`.main`);
const controlContainer = main.querySelector(`.main__control`);

const renderComponent = function (container, html) {
  container.insertAdjacentHTML(`beforeend`, html);
};

const getControlElement = function (caption, text, isChecked = false) {
  return `
    <input
        type="radio"
        name="control"
        id="control__${caption.toLowerCase()}"
        class="control__input visually-hidden"
        ${isChecked ? `checked` : ``}
    />
    <label
      for="control__${caption}"
      class="control__label control__label--${caption.toLowerCase()}
    ">${text.toUpperCase()}</label>
  `;
};

const renderControlElements = function () {
  renderComponent(
      controlContainer,
      `<section class="control__btn-wrap"></section>`
  );
  const controlsWrap = controlContainer.querySelector(`.control__btn-wrap`);
  CONTROLS.forEach(
      (it) => renderComponent(controlsWrap, getControlElement(it.caption, it.text, it.checked))
  );
};

const getSearchElement = function () {
  return `
      <section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
  `;
};

const getFilterElement = function (caption, count, isChecked = false) {
  return `
    <input
      type="radio"
      id="filter__${caption.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count === 0 ? `disabled` : ``}
    />
    <label for="filter__all" class="filter__label">
      ${caption}
      <span class="filter__${caption.toLowerCase()}-count">${count}</span>
    </label>
  `;
};

const renderFilterElements = function () {
  renderComponent(
      main,
      `<section class="main__filter filter container"></section>`
  );
  const filterContainer = main.querySelector(`.main__filter`);
  FILTERS.forEach(
      (it) => renderComponent(filterContainer, getFilterElement(it.caption, it.value, it.checked))
  );
};

const getBoardFilter = function (caption) {
  return `<a href="#" class="board__filter">${caption}</a>`;
};

const renderBoardFilterList = function (board) {
  renderComponent(
      board,
      `<div class="board__filter-list"></div>`
  );
  const boardFilterList = board.querySelector(`.board__filter-list`);
  BOARD_FILTERS.forEach(
      (it) => renderComponent(boardFilterList, getBoardFilter(it))
  );
};

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
  return `
    <span class="card__${type.toLowerCase()}">${value}</span>
  `;
};

const renderCardDates = function (container, obj) {
  if (obj.date || obj.time) {
    renderComponent(
        container,
        `<div class="card__dates">
          <div class="card__date-deadline">
            <p class="card__input-deadline-wrap"></p>
          </div>
        </div>`
    );
  }
  const cardInput = container.querySelector(`.card__input-deadline-wrap`);

  if (obj.date) {
    renderComponent(
        cardInput,
        getDateTime(`date`, obj.date)
    );
  }

  if (obj.time) {
    renderComponent(
        cardInput,
        getDateTime(`time`, obj.time)
    );
  }
};


const renderCardDetails = function (container, obj) {
  renderComponent(
      container,
      `<div class="card__settings">
        <div class="card__details"></div>
      </div>`
  );
  const cardDetails = container.querySelector(`.card__details`);
  renderCardDates(cardDetails, obj);
  renderHashtags(cardDetails, obj.hashtags);
};

const renderCard = function (container, obj) {
  renderComponent(
      container,
      `<article
        class="
          card
          card--${obj.color ? obj.color : `black`}
          ${obj.repeat ? ` card--repeat` : ``}
          ${obj.deadline ? ` card--deadline` : ``}
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
  getCardText(cardInner, obj.text);
  renderCardDetails(cardInner, obj);
};

const renderEditCard = function (container) {
  renderComponent(
      container,
      `<article class="card card--edit card--black">
      <form class="card__form" method="get">
        <div class="card__inner"></div>
      </form>
      </article>`
  );
  const cardEdit = container.querySelector(`.card--edit .card__inner`);
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
          >This is example of new task, you can add picture, set date and time, add tags.</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">no</span>
            </button>

            <fieldset class="card__date-deadline" disabled>
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
              repeat:<span class="card__repeat-status">no</span>
            </button>

            <fieldset class="card__repeat-days" disabled>
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

const renderBoardTasks = function (container) {
  renderComponent(
      container,
      `<div class="board__tasks"></div>`
  );
  const boardTasks = container.querySelector(`.board__tasks`);
  renderEditCard(boardTasks);
  CARDS_DATA.slice(0, 3).forEach(
      (it) => renderCard(boardTasks, it)
  );
};

const getLoadMoreButton = function () {
  return `
    <button class="load-more" type="button">load more</button>
  `;
};

const renderBoard = function () {
  renderComponent(
      main,
      `<section class="board container"></section>`
  );
  const boardContainer = main.querySelector(`.board`);

  renderBoardFilterList(boardContainer);
  renderBoardTasks(boardContainer);
  renderComponent(boardContainer, getLoadMoreButton());
};

renderControlElements();
renderComponent(main, getSearchElement());
renderFilterElements();
renderBoard();
