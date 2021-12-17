import FilmsCardView from '../view/films-card-view';
import FilmsPopupView from '../view/films-popup-view';
import CommentView from '../view/comment-view';
import { remove, render, RenderPosition, replace, } from '../render';
import { getRandomInteger } from '../utils';
import { generateComment } from '../generator-data';


const MAX_NUMBER_COMMENTS = 5;
const comments = Array.from({ length: MAX_NUMBER_COMMENTS }, generateComment);
const footer = document.querySelector('.footer');
const body = document.querySelector('body');


export default class FilmPresenter {
  #filmsListContainer = null;
  #changeData = null;

  #filmsCardComponent = null;
  #filmsPopupComponent = null;

  #card = null;

  constructor(filmsListContainer, changeData) {
    this.#filmsListContainer = filmsListContainer;
    this.#changeData = changeData;
  }

  init = (card) => {
    this.#card = card;

    const prevCardComponent = this.#filmsCardComponent;
    const prevPopupComponent = this.#filmsPopupComponent;

    this.#filmsCardComponent = new FilmsCardView(card);
    this.#filmsPopupComponent = new FilmsPopupView(card);

    this.#filmsCardComponent.setFilmClickHandler(this.#handleCardClick);
    this.#filmsPopupComponent.setPopupClickHandler(this.#handleClosePopupClick);

    this.#filmsCardComponent.setAddToWatchClickHandler(this.#handleAddToWatchClick);
    this.#filmsCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmsCardComponent.setWatchedClickHandler(this.#handleWatchedClick);

    this.#filmsPopupComponent.setAddToWatchClickHandler(this.#handleAddToWatchClick);
    this.#filmsPopupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmsPopupComponent.setWatchedClickHandler(this.#handleWatchedClick);


    if (prevCardComponent === null || prevPopupComponent === null) {
      render(this.#filmsListContainer, this.#filmsCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#filmsListContainer.element.contains(prevCardComponent.element)) {
      replace(this.#filmsCardComponent, prevCardComponent);
    }

    if (body.contains(this.#filmsPopupComponent.element) || body.contains(prevPopupComponent.element)) {
      replace(this.#filmsPopupComponent, prevPopupComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  }

  destroy = () => {
    remove(this.#filmsCardComponent);
    remove(this.#filmsPopupComponent);
  }

  #renderFilmsPopup = () => {
    render(footer, this.#filmsPopupComponent, RenderPosition.AFTEREND);
  }

  #renderComment = () => {
    const commentContainer = this.#filmsPopupComponent.element.querySelector('.film-details__comments-list');

    for (let i = 0; i < getRandomInteger(0, MAX_NUMBER_COMMENTS); i++) {
      render(commentContainer, new CommentView(comments[i]), RenderPosition.BEFOREEND);
    }
  }

  #closePopup = () => {
    body.classList.remove('hide-overflow');

    this.#filmsPopupComponent.element.remove();

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #openPopup = () => {
    body.classList.add('hide-overflow');
    this.#renderFilmsPopup();
    this.#renderComment();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleCardClick = () => {
    if (!body.querySelector('.film-details')) {
      this.#openPopup();
    }
  }

  // #handleCardClick = () => {
  //   this.#filmsPopupComponent.element.remove();
  //   if (!body.contains(this.#filmsPopupComponent.element)) {
  //     this.#openPopup();
  //   }
  // }

  #handleClosePopupClick = (/* card */) => {
    // this.#changeData(card);
    this.#closePopup();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#card, isFavorite: !this.#card.isFavorite });
    this.#renderComment();
  }

  #handleWatchedClick = () => {
    this.#changeData({ ...this.#card, isWatched: !this.#card.isWatched });
    this.#renderComment();
  }

  #handleAddToWatchClick = () => {
    this.#changeData({ ...this.#card, isAddedToWatch: !this.#card.isAddedToWatch });
    this.#renderComment();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };
}
