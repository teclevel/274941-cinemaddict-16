import { createElement } from '../render';
import { getTimeFromMins } from '../utility';

const createFilmsCard = (card) => {
  const { title, rating, year, duration, genres, description, poster, isAddedToWatch, isWatched, isFavorite } = card;
  const classActive = 'film-card__controls-item--active';

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
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${getTimeFromMins(duration)}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">5 comments</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addWatchListClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${addFavoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmsCard {
  #element = null;
  #cards = null;

  constructor(cards) {
    this.#cards = cards;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFilmsCard(this.#cards);
  }

  removeElement() {
    this.#element = null;
  }
}
