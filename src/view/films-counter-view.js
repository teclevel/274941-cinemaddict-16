import AbstractView from './abstract-view';

const createStatisticTemplate = (cards) => {
  const counter = cards.length;

  return (`<section class="footer__statistics">
    <p>
      ${counter} movies inside
    </p>
  </section>`);
};

export default class FilmCounterView extends AbstractView {
  #cards = null;

  constructor(cards) {
    super();
    this.#cards = cards;
  }

  get template() {
    return createStatisticTemplate(this.#cards);
  }
}
