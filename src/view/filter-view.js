import { FilterType } from '../const';
import AbstractView from './abstract-view';

const createFilterItemTemplate = ({ type, name, count }, currentFilterType) => {
  const itemActive = 'main-navigation__item--active';
  const filterCount = `<span class="main-navigation__item-count"> ${count} </span>`;

  return (
    `<a href="#${type}" class="main-navigation__item
      ${type === currentFilterType ? itemActive : ''}" data-filter-type="${type}">
      ${name}
      ${count ? filterCount : ''}
    </a>`
  );
};

const createStatisticTemplate = ({ type, name }, currentFilterType) => {
  const itemActive = 'main-navigation__item--active';
  return (
    `<a href="#${type}"
     class="main-navigation__additional
     ${type === currentFilterType ? itemActive : ''}" data-filter-type="${type}">
     ${name}</a>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .filter((filter) => filter.type !== FilterType.STATISTIC)
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  const statisticItemTemplate = filterItems
    .filter((filter) => filter.type === FilterType.STATISTIC)
    .map((filter) => createStatisticTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
        ${statisticItemTemplate}
    </nav>`
  );
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);

  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const itemFilter = evt.target.closest('a');

    if (!itemFilter) { return; }

    this._callback.filterTypeChange(itemFilter.dataset.filterType);

  }
}
