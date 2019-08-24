import {createElement} from '../utils';

class Search {
  constructor(text) {
    this._text = text;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `
      <section class="main__search search container">
        <input
          type="text"
          id="search__input"
          class="search__input"
          placeholder="${this._text.toUpperCase()}"
        />
        <label class="visually-hidden" for="search__input">Search</label>
      </section>
    `.trim();
  }
}
export {Search};
