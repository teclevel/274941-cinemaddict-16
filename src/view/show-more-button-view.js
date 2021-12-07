import AbstractView from './abstract-view';

const createButtonShowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more
  </button>`
);

export default class ButtonShowMoreView extends AbstractView {
  get template() {
    return createButtonShowMoreTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.showClick = callback;
    this.element.addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.showClick();
  }
}
