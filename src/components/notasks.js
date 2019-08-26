import {AbstractComponent} from './abstract-component';

class NoTasks extends AbstractComponent {
  constructor(message) {
    super();
    this._message = message;
  }

  getTemplate() {
    return `<p class="board__no-tasks">${this._message}</p>`.trim();
  }
}

export {NoTasks};
