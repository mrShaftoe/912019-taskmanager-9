import {AbstractComponent} from "./abstract-component";

class Hashtag extends AbstractComponent {
  constructor(hashtag) {
    super();
    this._hashtag = hashtag;
  }

  getTemplate() {
    return `
      <span class="card__hashtag-inner">
        <input
          type="hidden"
          name="hashtag"
          value="${this._hashtag}"
          class="card__hashtag-hidden-input"
        />
        <p class="card__hashtag-name">
          #${this._hashtag}
        </p>
        <button type="button" class="card__hashtag-delete">
          delete
        </button>
      </span>
    `.trim();
  }
}

export {Hashtag};
