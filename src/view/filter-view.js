import AbstractView from './abstract-view';

//  const FilterType = {
//   ALL_MOVIES: 'all',
//   WATCH_LIST: 'watchList',
//   HISTORY: 'history',
//   FAVORITES: 'favorites',
//   STATISTIC: 'stats'
// };

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
    .filter((filter) => filter.type !== 'stats')
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  const statisticItemTemplate = filterItems
    .filter((filter) => filter.type === 'stats')
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
    // this.element.querySelector('.main-navigation')
    //   .addEventListener('click', this.#filterTypeChangeHandler);
    this.element.addEventListener('click', this.#filterTypeChangeHandler);

  }

  // setStatisticTypeChangeHandler = (callback) => {
  //   this._callback.filterTypeChange = callback;
  //   this.element.querySelector('.main-navigation__additional')
  //     .addEventListener('click', this.#statisticTypeChangeHandler);
  // }


  #filterTypeChangeHandler = (evt) => {
    console.log('filter');
    evt.preventDefault();
    const itemFilter = evt.target.closest('a');

    if (!itemFilter) { return; }
    // if (evt.target.tagName !== 'A') { return; }

    this._callback.filterTypeChange(itemFilter.dataset.filterType);
    // this._callback.filterTypeChange(evt.target.dataset.filterType);

  }

  // #statisticTypeChangeHandler = (evt) => {
  //   evt.preventDefault();
  //   console.log('stats');
  // }
}
