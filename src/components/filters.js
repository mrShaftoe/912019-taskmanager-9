import renderComponent from './render';

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

const renderFilterElements = function (container, filtersData) {
  renderComponent(
      container,
      `<section class="main__filter filter container"></section>`
  );
  const filterContainer = container.querySelector(`.main__filter`);
  filtersData.forEach(
      ({CAPTION, value, checked}) => {
        renderComponent(filterContainer, getFilterElement(CAPTION, value, checked));
      }
  );
};

export {renderFilterElements};
