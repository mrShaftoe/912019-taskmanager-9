import renderComponent from './render';
const FILTERS = [
  {
    caption: `All`,
    set value(data) {
      this.filterValue = data.length;
    },
    get value() {
      return this.filterValue;
    },
    checked: true,
  },
  {
    caption: `Overdue`,
    set value(data) {
      this.filterValue = data.filter((it) => it.dueDate < Date.now()).length;
    },
    get value() {
      return this.filterValue;
    },
  },
  {
    caption: `Today`,
    set value(data) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      this.filterValue = data.filter(({dueDate}) => {
        const newDate = new Date(dueDate);
        return today === new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      }).length;
    },
    get value() {
      return this.filterValue;
    },
  },
  {
    caption: `Favorites`,
    set value(data) {
      this.filterValue = data.filter(({isFavorite}) => isFavorite).length;
    },
    get value() {
      return this.filterValue;
    },
  },
  {
    caption: `Repeating`,
    set value(data) {
      this.filterValue = data.filter(({repeatingDays}) => {
        return Object.keys(repeatingDays).some((it) => repeatingDays[it]);
      }).length;
    },
    get value() {
      return this.filterValue;
    },
  },
  {
    caption: `Tags`,
    set value(data) {
      this.filterValue = data.filter(({hashtags}) => hashtags.size).length;
    },
    get value() {
      return this.filterValue;
    },
  },
  {
    caption: `Archive`,
    set value(data) {
      this.filterValue = data.filter(({isArchive}) => isArchive).length;
    },
    get value() {
      return this.filterValue;
    },
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

const renderFilterElements = function (container, data) {
  FILTERS.forEach((it) => {
    it.value = data;
  });
  renderComponent(
      container,
      `<section class="main__filter filter container"></section>`
  );
  const filterContainer = container.querySelector(`.main__filter`);
  FILTERS.forEach(
      (it) => renderComponent(filterContainer, getFilterElement(it.caption, it.value, it.checked))
  );
};

export {renderFilterElements};
