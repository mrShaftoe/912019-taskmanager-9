import {AbstractComponent} from './abstract-component';

class BoardTasks extends AbstractComponent {
  getTemplate() {
    return ` <div class="board__tasks"></div>`.trim();
  }
}

export {BoardTasks};
