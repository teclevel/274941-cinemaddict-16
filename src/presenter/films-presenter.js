import FilmsCardView from '../view/films-card-view';
import FilmsPopupView from '../view/films-popup-view';
import CommentView from '../view/comment-view';
import { render, RenderPosition, remove } from '../render';
import { getRandomInteger } from '../utility';
import { generateComment } from '../generator-data';


const MAX_NUMBER_COMMENTS = 5;
const comments = Array.from({ length: MAX_NUMBER_COMMENTS }, generateComment);
const footer = document.querySelector('.footer');
const body = document.querySelector('body');


export default class FilmsPresenter {
  #filmsListContainer = null;

  #filmsCardComponent = null;
  #filmsPopupComponent = null;

  #filmsCard = null;

  constructor(filmsListContainer) {
    this.#filmsListContainer = filmsListContainer;
  }

  init = (card) => {
    this.#filmsCard = card;

    // const prevCardComponent = this.#filmsCardComponent;
    // const prevPopupComponent = this.#filmsPopupComponent;

    this.#filmsCardComponent = new FilmsCardView(card);
    this.#filmsPopupComponent = new FilmsPopupView(card);

    // if (this.#filmsListContainer.element.contains(prevPopupComponent.element)){
    this.#filmsCardComponent.setFilmClickHandler(this.#handleCardClick);
    this.#filmsPopupComponent.setPopupClickHandler(this.#handlePopupClick);

    // }

    // if (prevCardComponent === null || prevPopupComponent === null) {
    render(this.#filmsListContainer, this.#filmsCardComponent, RenderPosition.BEFOREEND);
    //   return;
    // }
  }

  #closePopup = () => {
    remove(this.#filmsPopupComponent);
    body.classList.remove('hide-overflow');
  }

  #openPopup = () => {
    body.classList.add('hide-overflow');

    this.#renderFilmsPopup();

    this.#renderComment();

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleCardClick = () => {
    this.#openPopup();

    this.#filmsPopupComponent.setPopupClickHandler(() => {
      document.removeEventListener('keydown', this.#escKeyDownHandler);
      this.#closePopup();
    });
  }

  #handlePopupClick = () => {
    console.log('click1');
    // this.#closePopup();
    // document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#closePopup();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #renderFilmsPopup = () => {
    render(footer, this.#filmsPopupComponent, RenderPosition.AFTEREND);
  }

  #renderComment = () => {
    const commentContainer = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < getRandomInteger(0, MAX_NUMBER_COMMENTS); i++) {
      render(commentContainer, new CommentView(comments[i]), RenderPosition.BEFOREEND);
    }
  }
}
