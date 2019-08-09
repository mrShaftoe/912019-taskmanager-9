import renderComponent from '../render.js';
import {renderCard, renderEditCard} from './cards';

const TASKS_DATA = [
  {
    text: `Example default task with default color.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
  },
  {
    color: `blue`,
    text: `Example default task with custom color.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
  },
  {
    color: `yellow`,
    text: `Example default task with custom color and without date.`,
    hashtags: [`todo`, `personal`, `important`],
  },
  {
    color: `green`,
    text: `Example default task with custom color and without hashtags.`,
    date: `23 September`,
    time: `11:15 PM`
  },
  {
    text: `Example default task without date and hashtags.`,
  },
  {
    color: `pink`,
    text: `It is example of repeating task. It marks by wave.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
    repeat: true
  },
  {
    color: `red`,
    text: `This is card with missing deadline.`,
    deadline: true
  },
  {
    text: `This is card with missing deadline. Deadline always marked by red line.`,
    date: `23 September`,
    time: `11:15 PM`,
    hashtags: [`todo`, `personal`, `important`],
    repeat: false,
    deadline: true
  }
];
const renderTasks = function (container) {
  renderComponent(
      container,
      `<div class="board__tasks"></div>`
  );
  const boardTasks = container.querySelector(`.board__tasks`);
  renderEditCard(boardTasks);
  TASKS_DATA.slice(0, 3).forEach(
      (it) => renderCard(boardTasks, it)
  );
};

export {renderTasks};
