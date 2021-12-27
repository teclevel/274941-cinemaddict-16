import { EMOJIS } from '../const';
import { formatDateComment, getTimeFromMins } from '../utils/day';
import AbstractView from './abstract-view';

const BLANK_DETAILS_FILM = {
  newEmoji: null,
  description: '',
  // isShowEmoji: false,

  isWatched: false,
  isAddedToWatch: false,
  isFavorite: false
};
console.log(BLANK_DETAILS_FILM);

const createGenresTemplate = (genres) => {
  let list = '';
  for (const genre of genres) {
    list += `<span class="film-details__genre">${genre}</span>`;
  }
  return list;
};

const createCommentTemplate = (comments) => {
  let list = '';
  for (const comment of comments) {
    const { emotion, commentText, name, date } = comment;

    list += `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${name}</span>
          <span class="film-details__comment-day">${formatDateComment(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  }
  return list;
};

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

const createNewCommentTemplate = (newComment, isEmoji) => {
  const { description } = newComment;
  const emojiTemplate = createEmojiListTemplate(isEmoji);
  const emojiView = isEmoji ? `<img src="images/emoji/${isEmoji}.png"
   width="55" height="55" alt="emoji-smile">` : '';

  return `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label">
      ${emojiView}
    </div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input"
      placeholder="Select reaction below and write comment here"
      name="comment">${description}</textarea>
    </label>
    <div class="film-details__emoji-list">
      ${emojiTemplate}
    </div>
  </div>`;
};

const createFilmsPopupTemplate = (data) => {
  const { poster, comments, title, rating, duration, genres, age, director, writers,
    actors, dateRelease, isAddedToWatch, isWatched, isFavorite, newEmoji } = data;
  // console.log(data);
  const itemsGenres = createGenresTemplate(genres);
  const itemsComments = createCommentTemplate(comments);
  const count = comments.length;
  const newCommentTemplate = createNewCommentTemplate(BLANK_DETAILS_FILM, newEmoji);
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
      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${count}</span></h3>
          <ul class="film-details__comments-list">
            ${itemsComments}
          </ul>
          ${newCommentTemplate}
        </section>
      </div>
    </form>
  </section>`;
};

export default class FilmsPopupView extends AbstractView {

  constructor(card = BLANK_DETAILS_FILM) {
    super();
    this._data = FilmsPopupView.parseCardToData(card);
    this.#setInnerHandler();
  }

  get template() {
    return createFilmsPopupTemplate(this._data);
  }

  updateData = (update, justDataUpdating) => {
    if (!update) {
      return;
    }

    this._data = { ...this._data, ...update };

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement = () => {
    const prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.element;

    parent.replaceChild(newElement, prevElement);

    this.restoreHandler();
  }

  restoreHandler = () => {
    this.#setInnerHandler();

  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
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

  #setInnerHandler = () => {
    this.element.addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#descriptionInputHandler);
  }

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      description: evt.target.value,
    }, true);
  }

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this._data.newEmoji = evt.target.value;
    this.updateData({ isEmojiChecked: !this._data.isShowEmoji });

    console.log(this._data);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(FilmsPopupView.parseDataToCard(this._data));
  }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closePopupClick(this._card);
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
    // isEmojiChecked: BLANK_DETAILS_FILM.isShowEmoji,
    newEmoji: null
  })

  static parseDataToCard = (data) => {
    const card = { ...data };

    if (!card.isEmojiChecked) {
      card.isEmojiChecked = false;
    }

    delete card.isEmojiChecked;

    return card;
  }
}
