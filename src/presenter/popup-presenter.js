// import ApiService from '../api-service';
import { RenderPosition, UpdateType, UserAction } from '../const';
// import { AUTHORIZATION, END_POINT } from '../main';
// import CommentsModel from '../model/comments-model';
import { remove, render, replace } from '../utils/render';
// import ContainerPopupView from '../view/containerPopup';
import FilmsPopupView from '../view/films-popup-view';


// const Mode = {
//   DEFAULT: 'DEFAULT',
//   POPUP: 'POPUP',
// };

// const footer = document.querySelector('.footer');
const body = document.querySelector('body');

export default class PopupPresenter {
  #filmsPopupComponent = null;
  #popupContainer = null;
  #changeData = null;
  #resetLoadingComments = true;
  // #changeMode = null;
  // #popupComponent = null;

  #card = null;
  // #isLoadingComments = true;
  // #comments = null;
  // #mode = Mode.DEFAULT;

  // #commentsModel = new CommentsModel(new ApiService(END_POINT, AUTHORIZATION));

  constructor(popupContainer, changeData, resetLoadingComments) {//, changeMode) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#resetLoadingComments = resetLoadingComments;
    // this.#changeMode = changeMode;
  }

  // get comments() {
  //   const comments = this.#commentsModel.comments;
  //   return comments;
  // }

  #renderPopup = (card) => {
    this.#card = card;

    const prevPopupComponent = this.#filmsPopupComponent;

    this.#filmsPopupComponent = new FilmsPopupView(card);

    this.#filmsPopupComponent.setPopupCloseClickHandler(this.#handleClosePopupClick);

    // this.#filmsPopupComponent.setAddToWatchClickHandler(this.#handleAddToWatchClick);
    // this.#filmsPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    // this.#filmsPopupComponent.setWatchedClickHandler(this.#handleWatchedClick);


    if (!prevPopupComponent) {
      render(this.#popupContainer, this.#filmsPopupComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this.#filmsPopupComponent, prevPopupComponent);
    remove(prevPopupComponent);

  }


  // destroy = () => {
  //   remove(this.#filmsPopupComponent);
  //   this.#commentsModel.removeObserver(this.#handleModelEvent);
  // }


  // resetView = () => {
  //   this.#filmsPopupComponent.reset(this.#card);
  //   this.#closePopup();
  // }

  showPopup = (card) => {
    this.#renderPopup(card);
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #closePopup = () => {
    body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#filmsPopupComponent);
  }

  #deleteComment = (cards, id) => {
    const comments = cards.comments.filter((comment) => comment.id !== id);
    delete cards.comments;
    cards.comments = comments;
  }


  #handleClosePopupClick = () => {
    this.#closePopup();

    // поменять значение в презентере доски isLoadingComments на true
    this.#resetLoadingComments = true;
    // удалить слушатель в презентере доски
    // this.#popupModel.removeObserver(this.#handleModelEvent);

  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      { ...this.#card, isFavorite: !this.#card.isFavorite });
  }

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      { ...this.#card, isWatched: !this.#card.isWatched });
  }

  #handleAddToWatchClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      { ...this.#card, isAddedToWatch: !this.#card.isAddedToWatch });
  }

  #handleDeleteCommentClick = (id) => {
    this.#deleteComment(this.#card, id);

    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.PATCH,
      this.#card
    );
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#closePopup();
    }
  }

  #handleSubmit = (update) => {
    this.#changeData(update);
  }
}
