import { BLANK_DETAILS_FILM } from '../const';
import { convertDateInYear, getTimeFromMins } from '../utils/day';
import SmartView from './smart-view';
import he from 'he';
import { EMOJIS } from '../const';
import { formatDateComment } from '../utils/day';


const createCommentTemplate = (comments) => (
  comments.map(({ emotion, comment, author, date, id }) =>
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formatDateComment(date)}</span>
          <button class="film-details__comment-delete" data-id-comment="${id}">Delete</button>
        </p>
      </div>
    </li>`
  ).join('')
);

const createEmojiListTemplate = (currentEmoji) => (
  EMOJIS.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden"
        name="comment-emoji"
        type="radio"
        id="emoji-${emoji}"
        value="${emoji}" ${currentEmoji === emoji ? 'checked' : ''}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  ).join('')
);

const createNewCommentTemplate = (newComment, isUserEmoji) => {
  const emojiTemplate = createEmojiListTemplate(isUserEmoji);
  const emojiView = isUserEmoji ? `<img src="images/emoji/${isUserEmoji}.png"
    width="55" height="55" alt="emoji-smile">` : '';

  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      ${emojiView}
    </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input"
      placeholder="Select reaction below and write comment here"
      name="comment">${he.encode(newComment)}</textarea>
    </label>
    <div class="film-details__emoji-list">
      ${emojiTemplate}
    </div>
  </div>`;
};

const createFilmsPopupCommentsTemplate = ({ comments, isUserEmoji, newComment }) => {
  const itemsComments = createCommentTemplate(comments);
  const count = comments.length;
  const newCommentTemplate = createNewCommentTemplate(newComment, isUserEmoji);

  return `<div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
          Comments <span class="film-details__comments-count">${count}</span>
        </h3>
        <ul class="film-details__comments-list">
          ${itemsComments}
        </ul>
        ${newCommentTemplate}
      </section>
    </div>`;
};

const createGenresTemplate = (genres) => (
  genres.map((genre) =>
    `<span class="film-details__genre">${genre}</span>`
  ).join('')
);

const createFilmsPopupTemplate = (data) => {
  const { poster, title, rating, duration, genres, age, director, writers,
    actors, dateRelease, isAddedToWatch, isWatched, isFavorite, comments, isUserEmoji, newComment, releaseCountry } = data;
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

  return `<form class="film-details__inner" action="" method="get">
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
              <td class="film-details__cell">${convertDateInYear(dateRelease)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getTimeFromMins(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
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
    ${createFilmsPopupCommentsTemplate({ comments, isUserEmoji, newComment })}
  </form>`;
};

export default class FilmsPopupView extends SmartView {
  _data = null;

  // constructor(card = BLANK_DETAILS_FILM) {
  constructor(card) {

    super();
    this._data = FilmsPopupView.parseCardToData(card);
    // this._data = card;

    this.#setInnerHandler();
  }

  get template() {
    return createFilmsPopupTemplate(this._data);
  }

  reset = (card) => {
    this.updateData(FilmsPopupView.parseCardToData(card));
  }

  restoreHandlers = () => {
    this.#setInnerHandler();
    this.setPopupCloseClickHandler(this._callback.closePopupClick);
    this.setAddToWatchClickHandler(this._callback.addToWatchClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteCommentClickHandler(this._callback.deleteCommentClick);
  }

  setDeleteCommentClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', this.#deleteCommentHandler);
  }

  setPopupCloseClickHandler(callback) {
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

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form')
      .addEventListener('keydown', this.#formSubmitHandler);
  }

  #setInnerHandler = () => {
    this.element.querySelector('.film-details__emoji-list').
      addEventListener('change', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#textCommentInputHandler);
  }

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    this._callback.deleteCommentClick(evt.target.dataset.idComment);
  }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closePopupClick(FilmsPopupView.parseDataToCard(this._data));
    // this._callback.closePopupClick(this._data);

  }

  #addToWatchClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchClick();
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    // this._callback.favoriteClick(FilmsPopupView.parseDataToCard(this._data));
    this._callback.favoriteClick(this._data);

  }

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  #emojiClickHandler = (evt) => {
    const scrollPopup = this.element.scrollTop;

    this.updateData({ isUserEmoji: evt.target.value });

    this.element.scroll(0, scrollPopup);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();

    if ((evt.ctrlKey || evt.metaKey) && evt.key === 'Enter') {
      this.element.querySelector('form').submit();
      this._callback.formSubmit(FilmsPopupView.parseDataToCard(this._data));
    }
  }

  #textCommentInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      newComment: evt.target.value,
    }, true);
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

    if (card.newComment) {
      card.newComment = '';
    }

    delete card.isUserEmoji;
    delete card.newComment;

    return card;
  }
}
