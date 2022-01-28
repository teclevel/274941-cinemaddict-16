// import { UpdateType } from '../const';
// import AbstractObservable from '../utils/abstract-observable';

// export default class CommentsModel extends AbstractObservable {
//   #apiService = null;
//   #comments = [];

//   constructor(apiService) {
//     super();
//     this.#apiService = apiService;
//   }

//   get comments() {
//     return this.#comments;
//   }

//   init = async (id) => {
//     try {
//       this.#comments = await this.#apiService.getComments(id);
//       console.log('model', this.#comments);
//     } catch (err) {
//       this.#comments = [];
//     }

//     this._notify(UpdateType.INIT);
//   }

//   updateComment = (updateType, update) => {
//     const index = this.#comments.findIndex((comment) => comment.id === update.id);

//     if (index === -1) {
//       throw new Error('Can\'t update unexisting comment');
//     }

//     this.#comments = [
//       ...this.#comments.slice(0, index),
//       update,
//       ...this.#comments.slice(index + 1),
//     ];

//     this._notify(updateType, update);
//   }

//   addComment = (updateType, update) => {
//     this.#comments = [
//       update,
//       ...this.#comments,
//     ];

//     this._notify(updateType, update);
//   }

//   deleteComment = (updateType, update) => {
//     const index = this.#comments.findIndex((comment) => comment.id === update.id);

//     if (index === -1) {
//       throw new Error('Can\'t delete unexisting comment');
//     }

//     this.#comments = [
//       ...this.#comments.slice(0, index),
//       ...this.#comments.slice(index + 1),
//     ];

//     this._notify(updateType);
//   }

//   // #adaptCommentToClient = (comment) => {
//   //   const adaptedComment = {
//   //     ...comment,
//   //     name: comment.author,
//   //     commentText: comment.comment,
//   //   };

//   //   return adaptedComment;
//   // }
// }
