import AbstractView from './abstract-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const { type, name, count } = filter;
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

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filterItemsTemplate}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
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
    this.element.querySelector('.main-navigation__items')
      .addEventListener('click', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    const itemFilter = evt.target.closest('a');

    if (!itemFilter) { return; }

    this._callback.filterTypeChange(itemFilter.dataset.filterType);
  }
}
