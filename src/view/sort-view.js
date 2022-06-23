import { SortType } from '../const';
import AbstractView from './abstract-view';

const createSortTemplate = (currentSortType) => {
  const listMenu = Object.values(SortType)
    .map((item) =>
      `<li><a href="#" class="sort__button ${currentSortType === item ? 'sort__button--active' : ''}"
          data-sort-type="${item}">Sort by ${item}</a>
      </li>`)
    .join('');

  return (
    `<ul class="sort">
        ${listMenu}
    </ul>`
  );
};

export default class FilmsSortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
