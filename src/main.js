"use strict";
const CONTROLS = [
  [`new-task`, `+ add new task`],
  [`task`, `tasks`, true],
  [`statistic`, `statisticts`]
];
const FILTERS = [
  [`All`, 13, true],
  [`Overdue`, 0],
  [`Today`, 0],
  [`Favorites`, 1],
  [`Repeating`, 1],
  [`Tags`, 1],
  [`Archive`, 115]
];
const BOARD_FILTERS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];
const CARD_CONTROLS = [`edit`, `archive`, `favorites`];
const CardsData = [
  {
    color: `black`,
    colorBar: `wave`,
    text: `Example default task with default color.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`]
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

const getControlElements = function () {
  renderComponent(
      controlContainer,
      `<section class="control__btn-wrap"></section>`
  );
  const controlsWrap = controlContainer.querySelector(`.control__btn-wrap`);
  CONTROLS.forEach(
      (it) => renderComponent(controlsWrap, getControlElement(...it))
  );
};

const getSearchElement = function () {
  renderComponent(
      main,
      `<section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="START TYPING — SEARCH BY WORD, #HASHTAG OR DATE"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>`
  );
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

const getFilterElements = function () {
  renderComponent(
      main,
      `<section class="main__filter filter container"></section>`
  );
  const filterContainer = main.querySelector(`.main__filter`);
  FILTERS.forEach(
      (it) => renderComponent(filterContainer, getFilterElement(...it))
  );
};

const getBoardFilter = function (caption) {
  return `<a href="#" class="board__filter">${caption}</a>`;
};

const getBoardFilterList = function (board) {
  renderComponent(
      board,
      `<div class="board__filter-list"></div>`
  );
  const boardFilterList = board.querySelector(`.board__filter-list`);
  BOARD_FILTERS.forEach(
      (it) => renderComponent(boardFilterList, getBoardFilter(it))
  );
};

const getCardButton = function (caption) {
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

const getCardControl = function (container) {
  renderComponent(container, `<div class="card__control"></div>`);
  const cardControl = container.querySelector(`.card__control`);
  CARD_CONTROLS.forEach(
      (it) => renderComponent(cardControl, getCardButton(it))
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

const getHashtags = function (container, hashtags) {
  renderComponent(
      container,
      `<div class="card__hashtag">
        <div class="card__hashtag-list"></div>
      </div>`
  );
};

const getCard = function (board, obj) {
  renderComponent(
      board,
      `<article class="card card--${obj.color}></article>`
  );
  const cards = board.querySelectorAll(`.card`);
  const card = cards[cards.length - 1];
  renderComponent(
      card,
      `<div class="card__form">
        <div class="card__inner"></div>
      </div>`
  );
  const cardInner = card.querySelector(cardInner);
  getCardControl(cardInner);
};

const getLoadMoreButton = function () {
  return `
    <button class="load-more" type="button">load more</button>
  `;
};

const getBoard = function () {
  renderComponent(
      main,
      `<section class="board container"></section>`
  );
  const boardContainer = document.querySelector(`.board`);

  getBoardFilterList(boardContainer);

  renderComponent(boardContainer, getLoadMoreButton());
};

getControlElements();
getSearchElement();
getFilterElements();
getBoard();
