import {AbstractComponent} from './abstract-component';

class Board extends AbstractComponent {
  getTemplate() {
    return `<section class="board container"></section>`.trim();
  }
}
export {Board};
