import AbstractObservable from '../utils/abstract-observable';

export default class FilmsModel extends AbstractObservable {
  #cards = [];

  set cards(cards) {
    this.#cards = [...cards];
  }

  get cards() {
    return this.#cards;
  }
}
