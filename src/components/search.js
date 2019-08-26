import {AbstractComponent} from './abstract-component';

class Search extends AbstractComponent {
  constructor(text) {
    super();
    this._text = text;
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
