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


const getTask = function () {
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


export {getTask};
