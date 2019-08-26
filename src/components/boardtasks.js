import {AbstractComponent} from './abstract-component';

class BoardTasks extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return ` <div class="board__tasks"></div>`.trim();
  }
}

export {BoardTasks};
