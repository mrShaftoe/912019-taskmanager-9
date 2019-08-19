import {renderCard} from './cards';

const renderTasks = function (container, data) {
  data.forEach(
      (it) => renderCard(container, it)
  );
};

export {renderTasks};
