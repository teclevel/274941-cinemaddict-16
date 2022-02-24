import { UpdateType } from '../const';
import AbstractObservable from '../utils/abstract-observable';

export default class PopupModel extends AbstractObservable {
  #apiService = null;
  #comments = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (id) => {
    try {
      this.#comments = await this.#apiService.comments(id);

    } catch (err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT_COMMENTS);
  }

  // updateComment = (updateType, update) => {
  //   const index = this.#comments.findIndex((comment) => comment.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t update unexisting comment');
  //   }

  //   this.#comments = [
  //     ...this.#comments.slice(0, index),
  //     update,
  //     ...this.#comments.slice(index + 1),
  //   ];

  //   this._notify(updateType, update);
  // }

  addComment = async (updateType, update) => {
    try {
      const response = await this.#apiService.addComment(update);
      const newComment = response;
      this.#comments = [newComment, ...this.#comments,];
      this._notify(updateType, update);

    } catch (err) {
      throw new Error('Can\'t add comment');
    }
  }

  deleteComment = async (updateType, update) => {
    const index = this.#comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#apiService.deleteComment(update);
      this.#comments = [
        ...this.#comments.slice(0, index),
        ...this.#comments.slice(index + 1),
      ];

      this._notify(updateType);

    } catch (err) {
      throw new Error('Can\'t delete comment');
    }
  }
}
