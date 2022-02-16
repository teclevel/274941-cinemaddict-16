import { RenderPosition, UpdateType, UserAction } from '../const';
import { remove, render, replace } from '../utils/render';
import FilmsPopupView from '../view/films-popup-view';
import { ModePopup } from './films-list-presenter';

const body = document.querySelector('body');

export default class PopupPresenter {
  #filmsPopupComponent = null;
  #popupContainer = null;
  #changeData = null;
  #card = null;

  constructor(popupContainer, changeData, card) {
    this.#popupContainer = popupContainer;
    this.#changeData = changeData;
    this.#card = card;
  }

  #renderPopup = () => {
    const prevPopupComponent = this.#filmsPopupComponent;

    this.#filmsPopupComponent = new FilmsPopupView(this.#card);

    this.#filmsPopupComponent.setPopupCloseClickHandler(this.#handleClosePopupClick);

    this.#filmsPopupComponent.setAddToWatchClickHandler(this.#handleAddToWatchClick);
    this.#filmsPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmsPopupComponent.setWatchedClickHandler(this.#handleWatchedClick);


    if (!prevPopupComponent) {
      render(this.#popupContainer, this.#filmsPopupComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this.#filmsPopupComponent, prevPopupComponent);
    remove(prevPopupComponent);
  }

  showPopup = () => {
    this.#renderPopup();
    body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
    ModePopup.isClosePopup = false;

  }

  closePopup = () => {
    body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#filmsPopupComponent);

    ModePopup.IsLoadingComments = true;
    ModePopup.isClosePopup = true;
  }

  #deleteComment = (cards, id) => {
    const comments = cards.comments.filter((comment) => comment.id !== id);
    delete cards.comments;
    cards.comments = comments;
  }


  #handleClosePopupClick = () => {
    this.closePopup();
  }

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      { ...this.#card, isFavorite: !this.#card.isFavorite });
  }

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      { ...this.#card, isWatched: !this.#card.isWatched });
  }

  #handleAddToWatchClick = () => {
    this.#changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
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
      this.closePopup();
    }
  }

  #handleSubmit = (update) => {
    this.#changeData(update);
  }
}