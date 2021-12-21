import { RenderPosition } from '../const';
import { remove, render, replace } from '../utils/render';
import FilmsCardView from '../view/films-card-view';
import FilmsPopupView from '../view/films-popup-view';

const footer = document.querySelector('.footer');
const body = document.querySelector('body');
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'POPUP',
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
console.log(this.#mode);
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

  resetView = () => {
    console.log(this.#mode);
    if (this.#mode !== Mode.DEFAULT) {
      this.#openPopup();
    }
  };

  #closePopup = () => {
    body.classList.remove('hide-overflow');
    this.#filmsPopupComponent.element.remove();
    this.#mode = Mode.DEFAULT;
  }

  #openPopup = () => {
    body.classList.add('hide-overflow');
    this.#renderFilmsPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler, { once: true });
    this.#changeMode();
    this.#mode = Mode.POPUP;
  }

  // #handleCardClick = () => {
  //   if (!body.querySelector('.film-details')) {
  //     this.#openPopup();
  //   }
  // }

  #handleCardClick = () => {
    this.#openPopup();
  }

  #handleClosePopupClick = () => {
    this.#closePopup();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
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
