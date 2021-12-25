import { SortType } from '../const';
import AbstractView from './abstract-view';

const CLASS_SORT_BUTTON_ACTIVE = 'sort__button--active';

const createSortTemplate = () => (
  `<ul class="sort">
      <li><a href="#" class="sort__button ${CLASS_SORT_BUTTON_ACTIVE}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class FilmsSortView extends AbstractView {

  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this.#removeClassActive();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    evt.target.classList.add(CLASS_SORT_BUTTON_ACTIVE);
  }

  #removeClassActive = () => {
    const button = this.element.querySelector(`.${CLASS_SORT_BUTTON_ACTIVE}`);

    if (button) {
      button.classList.remove(CLASS_SORT_BUTTON_ACTIVE);
    }
  }
}
