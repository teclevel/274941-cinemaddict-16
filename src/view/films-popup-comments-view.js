import { BLANK_DETAILS_FILM, EMOJIS } from '../const';
import { formatDateComment } from '../utils/day';
import SmartView from './smart-view';

const createCommentTemplate = (comments) => (
  comments.map(({ emotion, commentText, name, date, id }) =>
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${commentText}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${name}</span>
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
  const { textComment } = newComment;
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
      name="comment">${textComment}</textarea>
    </label>
    <div class="film-details__emoji-list">
      ${emojiTemplate}
    </div>
  </div>`;
};

const createFilmsPopupCommentsTemplate = (data) => {
  const { comments, isUserEmoji } = data;
  const itemsComments = createCommentTemplate(comments);
  const count = comments.length;

  const newCommentTemplate = createNewCommentTemplate(BLANK_DETAILS_FILM, isUserEmoji);

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

export default class FilmsPopupCommentsView extends SmartView {

  constructor(card = BLANK_DETAILS_FILM) {
    super();
    this._data = FilmsPopupCommentsView.parseCardToData(card);
    this.#setInnerHandler();
  }

  get template() {
    return createFilmsPopupCommentsTemplate(this._data);
  }

  reset = (card) => {
    this.updateData(FilmsPopupCommentsView.parseCardToData(card));
  }

  restoreHandlers = () => {
    this.#setInnerHandler();
    this.setDeleteCommentClickHandler(this._callback.deleteCommentClick);
  }

  setDeleteCommentClickHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    console.log(this.element.querySelector('.film-details__comments-list'));

    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', ()=>{console.log('click');});
  }

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }
    this._callback.deleteCommentClick(evt.target.dataset.idComment);
  }

  #setInnerHandler = () => {
    this.element.addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#textCommentInputHandler);
  }

  #emojiClickHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    const scrollPopup = this.element.scrollTop;

    this.updateData({ isUserEmoji: evt.target.value });

    this.element.scroll(0, scrollPopup);
  }

  #textCommentInputHandler = (evt) => {
    evt.preventDefault();
    this.updateData({
      textComment: evt.target.value,
    }, true);
  }

  // #formSubmitHandler = (evt) => {
  //   evt.preventDefault();
  //   this._callback.formSubmit(FilmsPopupView.parseDataToCard(this._data));
  // }


  static parseCardToData = (card) => ({
    ...card,
    isUserEmoji: null
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