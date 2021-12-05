import { createElement } from '../render';

const createMovieCounterTemplate = (cards) => {
  const counter = cards.length;

  return (`<section class="footer__statistics">${counter}</section>`);
};

export default class MovieCounterView  {
  #element = null;
  #cards = null;

  constructor(cards) {
    this.#cards = cards;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMovieCounterTemplate(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}
