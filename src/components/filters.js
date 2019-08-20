import renderComponent from './render';
const FILTERS = [
  {
    caption: `All`,
    filter(it) {
      return it;
    },
    checked: true,
  },
  {
    caption: `Overdue`,
    filter({dueDate}) {
      return dueDate < Date.now();
    }
  },
  {
    caption: `Today`,
    filter({dueDate}) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const newDate = new Date(dueDate);
      const taskDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      return today.toString() === taskDate.toString();
    }

  },
  {
    caption: `Favorites`,
    filter({isFavorite}) {
      return isFavorite;
    },

  },
  {
    caption: `Repeating`,
    filter({repeatingDays}) {
      return Object.keys(repeatingDays).some((it) => repeatingDays[it]);
    },

  },
  {
    caption: `Tags`,
    filter({hashtags}) {
      return hashtags.size;
    },
  },
  {
    caption: `Archive`,
    filter({isArchive}) {
      return isArchive;
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

const renderFilterElements = function (container, tasksData) {
  renderComponent(
      container,
      `<section class="main__filter filter container"></section>`
  );
  const filterContainer = container.querySelector(`.main__filter`);
  FILTERS.forEach(
      (it) => {
        it.value = tasksData.filter(it.filter).length;
        renderComponent(filterContainer, getFilterElement(it.caption, it.value, it.checked));
      }
  );
};

export {renderFilterElements};
