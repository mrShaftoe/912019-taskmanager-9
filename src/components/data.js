import {getRandomInt} from '../utils';
const MS_IN_DAY = 24 * 60 * 60 * 1000;
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const HASHTAGS_LIST = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const MAX_HASHTAGS = 3;
const getHashtags = function () {
  const shuffled = [];
  for (let i = 0; i < HASHTAGS_LIST.length; i++) {
    const j = getRandomInt(i);
    shuffled[i] = shuffled[j];
    shuffled[j] = HASHTAGS_LIST[i];
  }
  return shuffled.slice(0, getRandomInt(MAX_HASHTAGS));
};

const getTask = function () {
  return {
    description: DESCRIPTIONS[getRandomInt(DESCRIPTIONS.length)],

    dueDate: Date.now() + 1 + getRandomInt(7, -7) * MS_IN_DAY,

    repeatingDays: {
      mo: false,
      tu: false,
      we: false,
      th: Boolean(Math.round(Math.random())),
      fr: false,
      sa: false,
      su: false,
    },

    hashtags: new Set(getHashtags()),

    color: COLORS[getRandomInt(COLORS.length)],

    isFavorite: Boolean(Math.round(Math.random())),

    isArchive: Boolean(Math.round(Math.random())),
  };
};


export {getTask};
