import {AbstractComponent} from './abstract-component';

class Board extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="board container"></section>`.trim();
  }
}
export {Board};
