import {AbstractComponent} from './abstract-component';

class LoadMoreButton extends AbstractComponent {
  constructor(buttonText) {
    super();
    this._buttonText = buttonText;

  }

  getTemplate() {
    return `<button class="load-more" type="button">${this._buttonText}</button>`.trim();
  }
}

export {LoadMoreButton};
