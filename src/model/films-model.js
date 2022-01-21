import AbstractObservable from '../utils/abstract-observable';

export default class FilmsModel extends AbstractObservable {
  #cards = [];

  set cards(cards) {
    this.#cards = [...cards];
  }

  get cards() {
    return this.#cards;
  }

  updateCard = (updateType, update) => {//если обновляются данные , то
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      update,
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType, update); //вызывается уведомление подписчиков
  }

  addCard = (updateType, update) => {//аналогично
    this.#cards = [
      update,
      ...this.#cards,
    ];

    this._notify(updateType, update);//
  }

  deleteCard = (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
