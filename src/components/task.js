const CARD_CONTROLS = [`edit`, `archive`, `favorites`];
const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];

const getRepeatingDay = function (dayName, isRepeating) {
  return `
    <input
      class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${dayName.toLowerCase()}-1"
        name="repeat"
        value="${dayName.toLowerCase()}"
        ${isRepeating ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${dayName.toLowerCase()}-1"
        >${dayName}</label
      >`;
};

const getRepeatingDays = function (repeatingDays) {
  return Object.keys(repeatingDays).map((it) => getRepeatingDay(it, repeatingDays[it])).join(``);
};

const getColor = function (color, isChecked) {
  return `
    <input
      type="radio"
      id="color-${color}-1"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${isChecked ? `checked` : ``}
    />
    <label
      for="color-${color}-1"
      class="card__color card__color--${color}"
      >${color}</label
    >`;
};
const getCardControlButton = function (caption) {
  return `
      <button
        type="button"
        class="
        card__btn card__btn--${caption.toLowerCase()}
        ${caption === `favorites` ? ` card__btn--disabled` : ``}"
      >
      ${caption.toLowerCase()}
      </button>
  `;
};

const getDateOrTime = function (type, value) {
  const dateTime = type === `date` ?
    new Intl.DateTimeFormat(`en-GB`, {month: `long`, day: `numeric`}).format(value).toUpperCase() :
    new Intl.DateTimeFormat(`en-GB`, {hour: `2-digit`, minute: `2-digit`}).format(value);
  return `
    <span class="card__${type.toLowerCase()}">${dateTime}</span>
  `;
};

const getCardDeadline = function (dueDate) {
  return `
    <div class="card__dates">
      <div class="card__date-deadline">
        <p class="card__input-deadline-wrap">
          ${getDateOrTime(`date`, dueDate)}
          ${getDateOrTime(`time`, dueDate)}
        </p>
      </div>
    </div>
  `;
};

const getHashtag = function (name) {
  return `
    <span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${name.toLowerCase()}
      </span>
    </span>
  `;
};

const getHashtags = function (hashtags) {
  return `
    <div class="card__hashtag">
      <div class="card__hashtag-list">
        ${hashtags.map(getHashtag).join(``)}
      </div>
    </div>
  `;
};

const getTask = function ({color, description, dueDate, hashtags, repeatingDays}) {
  const isRepeating = Object.values(repeatingDays).some((it) => it);
  return `
    <article
      class="
        card
        card--${color}
        ${isRepeating ? ` card--repeat` : ``}
        ${dueDate <= Date.now() ? ` card--deadline` : ``}
    ">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            ${CARD_CONTROLS.map(getCardControlButton).join(``)}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${dueDate ? getCardDeadline(dueDate) : ``}
              ${hashtags ? getHashtags(hashtags) : ``}
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
};

const getTaskEdit = function ({description, dueDate, repeatingDays, color}) {
  const isRepeating = Object.values(repeatingDays).some((it) => it);
  return `
    <article
      class="
        card
        card--edit
        card--${color}
        ${isRepeating ? ` card--repeat` : ``}
        ${dueDate <= Date.now() ? ` card--deadline` : ``}
    ">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            ${CARD_CONTROLS.slice(1).map(getCardControlButton).join(``)}
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${dueDate ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${dueDate ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${isRepeating ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                    ${getRepeatingDays(repeatingDays)}
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list"></div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${COLORS.map((it) => getColor(it, it === color)).join(` `)}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>
  `;
};

export {getTask, getTaskEdit};
