const MS_IN_DAY = 24 * 60 * 60 * 1000;
const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];
const COLORS = [`black`, `yellow`, ` blue`, `green`, `pink`];
const HASHTAGS_LIST = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const MAX_HASHTAGS = 3;
const getHashtags = function () {
  const shuffled = [];
  for (let i = 0; i < HASHTAGS_LIST.length; i++) {
    const j = Math.floor(Math.random() * i);
    shuffled[i] = shuffled[j];
    shuffled[j] = HASHTAGS_LIST[i];
  }
  return shuffled.slice(0, Math.floor(Math.random() * MAX_HASHTAGS));
};

const getTask = function () {
  return {
    description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],

    dueDate: Date.now() + 1 + (Math.floor(Math.random() * 14) - 7) * MS_IN_DAY,

    repeatingDays: {
      Mo: false,
      Tu: false,
      We: false,
      Th: Boolean(Math.round(Math.random())),
      Fr: false,
      Sa: false,
      Su: false,
    },

    hashtags: new Set(getHashtags()),

    color: COLORS[Math.floor(Math.random() * COLORS.length)],

    isFavorite: Boolean(Math.round(Math.random())),

    isArchive: Boolean(Math.round(Math.random())),
  };
};


export {getTask};
