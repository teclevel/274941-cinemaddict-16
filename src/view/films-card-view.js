import { convertDateInYear } from '../utils/day';
import AbstractView from './abstract-view';

const createFilmsCardTemplate = (card) => {
  const { title, comments, rating, dateRelease, duration, genres, description, poster, isAddedToWatch, isWatched, isFavorite } = card;
  const classActive = 'film-card__controls-item--active';
  const count = comments.length;

  const addWatchListClassName = isAddedToWatch
    ? classActive
    : '';

  const watchedClassName = isWatched
    ? classActive
    : '';

  const addFavoriteClassName = isFavorite
    ? classActive
    : '';

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${convertDateInYear(dateRelease)}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${count} comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addWatchListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${addFavoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmsCardView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createFilmsCardTemplate(this.#card);
  }

  setFilmClickHandler = (callback) => {
    this._callback.filmClick = callback;
    this.element.querySelector('.film-card__link')
      .addEventListener('click', this.#filmClickHandler);
  }

  setAddToWatchClickHandler = (callback) => {
    this._callback.addToWatchClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#addToWatchClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#watchedClickHandler);
  }

  #filmClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.filmClick(this.#card);
  }

  #addToWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchClick(this.#card);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick(this.#card);
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick(this.#card);
  }
}
