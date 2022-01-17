import { BLANK_DETAILS_FILM, RenderPosition } from '../const';
import { getTimeFromMins } from '../utils/day';
import { render } from '../utils/render';
import FilmsPopupCommentsView from './films-popup-comments-view';
import SmartView from './smart-view';

const createGenresTemplate = (genres) => (
  genres.map((genre) =>
    `<span class="film-details__genre">${genre}</span>`
  ).join('')
);

const createFilmsPopupTemplate = (data) => {
  const { poster, title, rating, duration, genres, age, director, writers,
    actors, dateRelease, isAddedToWatch, isWatched, isFavorite } = data;
  const itemsGenres = createGenresTemplate(genres);

  const addWatchListClassName = isAddedToWatch
    ? 'film-details__control-button--active'
    : '';

  const watchedClassName = isWatched
    ? 'film-details__control-button--active'
    : '';

  const addFavoriteClassName = isFavorite
    ? 'film-details__control-button--active'
    : '';

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">
            <p class="film-details__age">${age}+</p>
          </div>
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${dateRelease}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${getTimeFromMins(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${itemsGenres}
              </tr>
            </table>
            <p class="film-details__film-description">
              The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.
            </p>
          </div>
        </div>
        <section class="film-details__controls">
          <button type="button" class="film-details__control-button ${addWatchListClassName} film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button ${watchedClassName} film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button ${addFavoriteClassName} film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

    </form>
  </section>`;
};

export default class FilmsPopupView extends SmartView {
  card = null;
  comments = null;

  constructor(card = BLANK_DETAILS_FILM) {
    super();
    this._data = FilmsPopupView.parseCardToData(card);
    this.comments = new FilmsPopupCommentsView({
      comments: this._data.comments,
      isUserEmoji: this._data.isUserEmoji,
      newComment: this._data.newComment
    });
    render(this.element.querySelector('form'), this.comments, RenderPosition.BEFORE_END);
  }

  get template() {
    return createFilmsPopupTemplate(this._data);
  }

  reset = (card) => {
    this.updateData(FilmsPopupView.parseCardToData(card));
  }

  restoreHandlers = () => {
    this.setPopupClickHandler(this._callback.closePopupClick);
    this.setAddToWatchClickHandler(this._callback.addToWatchClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
  }

  submitForm = () => {
    this.element.querySelector('form')
      .submit(FilmsPopupView.parseDataToCard(this._data));
  }

  setPopupClickHandler(callback) {
    this._callback.closePopupClick = callback;
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closePopupClickHandler);
  }

  setAddToWatchClickHandler = (callback) => {
    this._callback.addToWatchClick = callback;
    this.element.querySelector('#watchlist')
      .addEventListener('click', this.#addToWatchClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('#favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('#watched')
      .addEventListener('click', this.#watchedClickHandler);
  }

  // #formSubmitHandler = (evt) => {
  //   evt.preventDefault();
  //   this._callback.formSubmit(FilmsPopupView.parseDataToCard(this._data));
  // }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closePopupClick(FilmsPopupView.parseDataToCard(this._data));
  }

  #addToWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  static parseCardToData = (card) => ({
    ...card,
    isUserEmoji: null,
    newComment: ''
  })

  static parseDataToCard = (data) => {
    const card = { ...data };

    if (card.isUserEmoji) {
      card.isUserEmoji = null;
    }

    delete card.isUserEmoji;

    return card;
  }
}
