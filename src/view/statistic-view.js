import { createElement } from '../render';

const createStatisticTemplate = (cards) => {
  const counter = cards.length;

  return (`<section class="footer__statistics">${counter}</section>`);
};

export default class Statistic  {
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
    return createStatisticTemplate(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}
