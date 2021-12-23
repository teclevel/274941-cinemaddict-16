import { RenderPosition } from '../const';
import { remove, render, replace } from '../utils/render';
import FilmsCardView from '../view/films-card-view';
import FilmsPopupView from '../view/films-popup-view';

const footer = document.querySelector('.footer');
const body = document.querySelector('body');
const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP',
};

export default class FilmPresenter {
  #filmsListContainer = null;
  #changeData = null;
  #changeMode = null;

  #filmsCardComponent = null;
  #filmsPopupComponent = null;

  #card = null;
  #mode = Mode.DEFAULT;

  constructor(filmsListContainer, changeData, changeMode) {
    this.#filmsListContainer = filmsListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
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

    replace(this.#filmsCardComponent, prevCardComponent);

    if(this.#mode === Mode.POPUP){
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

  resetView = () => {

    if (this.#mode !== Mode.DEFAULT) {
      this.#closePopup();
    }
  };

  #closePopup = () => {
    body.classList.remove('hide-overflow');
    this.#filmsPopupComponent.element.remove();
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #openPopup = () => {
    this.#renderFilmsPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.POPUP;
  }

  #handleCardClick = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#openPopup();
      body.classList.add('hide-overflow');
    }
  }

  #handleClosePopupClick = () => {
    this.#closePopup();
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#card, isFavorite: !this.#card.isFavorite });
  }

  #handleWatchedClick = () => {
    this.#changeData({ ...this.#card, isWatched: !this.#card.isWatched });
  }

  #handleAddToWatchClick = () => {
    this.#changeData({ ...this.#card, isAddedToWatch: !this.#card.isAddedToWatch });
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
    }
  };
}
