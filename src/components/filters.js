import renderComponent from './render.js';
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

const renderFilterElements = function (container) {
  renderComponent(
      container,
      `<section class="container__filter filter container"></section>`
  );
  const filterContainer = container.querySelector(`.container__filter`);
  FILTERS.forEach(
      (it) => renderComponent(filterContainer, getFilterElement(it.caption, it.value, it.checked))
  );
};

export {renderFilterElements};
