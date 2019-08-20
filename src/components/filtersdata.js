const Filters = [
  {
    CAPTION: `All`,
    filter(it) {
      return it;
    },
    checked: true,
  },
  {
    CAPTION: `Overdue`,
    filter({dueDate}) {
      return dueDate < Date.now();
    }
  },
  {
    CAPTION: `Today`,
    filter({dueDate}) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const newDate = new Date(dueDate);
      const taskDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
      return today.toString() === taskDate.toString();
    }

  },
  {
    CAPTION: `Favorites`,
    filter({isFavorite}) {
      return isFavorite;
    },

  },
  {
    CAPTION: `Repeating`,
    filter({repeatingDays}) {
      return Object.keys(repeatingDays).some((it) => repeatingDays[it]);
    },

  },
  {
    CAPTION: `Tags`,
    filter({hashtags}) {
      return hashtags.size;
    },
  },
  {
    CAPTION: `Archive`,
    filter({isArchive}) {
      return isArchive;
    },
  }
];

const getFiltersData = function (tasksData) {
  Filters.forEach((it) => {
    it.value = tasksData.filter(it.filter).length;
  });
  return Filters;
};

export {getFiltersData};
