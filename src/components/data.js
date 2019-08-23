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

const Filters = [
  {
    CAPTION: `All`,
    filter(it) {
      return it;
    },
    isChecked: true,
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
      return hashtags.length;
    },
  },
  {
    CAPTION: `Archive`,
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
  Filters.forEach((it) => {
    it.value = tasksData.filter(it.filter).length;
  });
  return Filters;
};

export {getTaskData, getFiltersData, CONTROLS, SEARCH_PLACEHOLDER};
