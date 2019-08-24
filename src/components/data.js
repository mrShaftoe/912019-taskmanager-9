import {getRandomInt, getShuffledArray} from '../utils';

const MS_IN_DAY = 24 * 60 * 60 * 1000;
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const HASHTAGS_LIST = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const MAX_HASHTAGS = 3;
const SEARCH_PLACEHOLDER = `START TYPING — SEARCH BY WORD, #HASHTAG OR DATE`;
const CONTROLS = [
  {
    caption: `new-task`,
    text: `+ add new task`
  },
  {
    caption: `task`,
    text: `tasks`,
    isChecked: true},
  {
    caption: `statistic`,
    text: `statisticts`}
];

const SORTINGS = [`SORT BY DEFAULT`, `SORT BY DATE up`, `SORT BY DATE down`];
const LOAD_MORE_TEXT = `load more`;

const FILTERS = [
  {
    caption: `All`,
    filter(it) {
      return it;
    },
    isChecked: true,
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
      return hashtags.length;
    },
  },
  {
    caption: `Archive`,
    filter({isArchive}) {
      return isArchive;
    },
  }
];

const getTaskData = function () {
  return {
    description: DESCRIPTIONS[getRandomInt(DESCRIPTIONS.length)],

    dueDate: Date.now() + 1 + getRandomInt(7, -7) * MS_IN_DAY,

    repeatingDays: {
      Mo: false,
      Tu: false,
      We: false,
      Th: Boolean(Math.round(Math.random())),
      Fr: false,
      Sa: false,
      Su: false,
    },

    hashtags: getShuffledArray(HASHTAGS_LIST).slice(0, getRandomInt(MAX_HASHTAGS)),

    color: COLORS[getRandomInt(COLORS.length)],

    isFavorite: Boolean(Math.round(Math.random())),

    isArchive: Boolean(Math.round(Math.random())),
  };
};

const getFiltersData = function (tasksData) {
  FILTERS.forEach((it) => {
    it.value = tasksData.filter(it.filter).length;
  });
  return FILTERS;
};

export {getTaskData, getFiltersData, CONTROLS, SEARCH_PLACEHOLDER, SORTINGS, LOAD_MORE_TEXT};
