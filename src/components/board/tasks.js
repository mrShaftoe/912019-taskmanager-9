import {renderCard} from './cards';

const renderTasks = function (container, tasksData) {
  tasksData.forEach(
      (it) => renderCard(container, it)
  );
};

export {renderTasks};
