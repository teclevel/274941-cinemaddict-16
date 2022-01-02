import { RenderPosition, UpdateType, UserAction } from '../const';
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

    // this.#filmsPopupComponent.setFormSubmitHandler(this.#handleFormSubmit);

    if (!prevCardComponent || !prevPopupComponent) {
      render(this.#filmsListContainer, this.#filmsCardComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this.#filmsCardComponent, prevCardComponent);

    if (this.#mode === Mode.POPUP) {
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
    render(footer, this.#filmsPopupComponent, RenderPosition.AFTER_END);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#filmsPopupComponent.reset(this.#card);
      this.#closePopup();
    }
  }

  #closePopup = () => {
    body.classList.remove('hide-overflow');
    this.#filmsPopupComponent.reset(this.#card);
    this.#filmsPopupComponent.element.remove();
    this.#mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    document.removeEventListener('keydown', this.#ctrlEnterKeyDownHandler);
  }

  #openPopup = () => {
    this.#renderFilmsPopup();
    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.addEventListener('keydown', this.#ctrlEnterKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.POPUP;
  }

  // #submitForm =(card)=>{
  //   this.#filmsPopupComponent.element.querySelector('form').submit(card);
  // }

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

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.#closePopup();
    }
  }

  // #handleFormSubmit = (card) => {
  //   // this.#changeData(card);
  //   this.#submitForm(card);
  // }

  #ctrlEnterKeyDownHandler = (evt) => {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === 'Enter') {
      this.#filmsPopupComponent.submitForm();
      // console.log('ctrlEnter');
    }
  }
}
