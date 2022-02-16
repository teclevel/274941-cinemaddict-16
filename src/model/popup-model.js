import { UpdateType } from '../const';
import AbstractObservable from '../utils/abstract-observable';

export default class PopupModel extends AbstractObservable {
  #apiService = null;
  #comments = [];
  // #cards = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (id) => {
    try {
      this.#comments = await this.#apiService.getComments(id);

    } catch (err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT_COMMENTS);
  }

  // updateCard = (updateType, update) => {
  //   const index = this.#cards.findIndex((card) => card.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t update unexisting card');
  //   }

  //   this.#cards = [
  //     ...this.#cards.slice(0, index),
  //     update,
  //     ...this.#cards.slice(index + 1),
  //   ];

  //   this._notify(updateType, update);
  // }

  updateComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      update,
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment = (updateType, update) => {
    this.#comments = [
      update,
      ...this.#comments,
    ];

    this._notify(updateType, update);
  }

  deleteComment = (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType);
  }
}