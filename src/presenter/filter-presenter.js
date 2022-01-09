import FilterView from '../view/filter-view';
import { FilterType, RenderPosition, UpdateType, } from '../const';
import { filter } from '../utils/filter';
import { remove, render, replace } from '../utils/render';


export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const cards = this.#filmsModel.cards;

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'All movies',
        count: ''
      },
      {
        type: FilterType.WATCH_LIST,
        name: 'Watchlist',
        count: filter[FilterType.WATCH_LIST](cards).length > 0 ? filter[FilterType.WATCH_LIST](cards).length : '0'
      },
      {
        type: FilterType.HISTORY,
        name: 'History',
        count: filter[FilterType.HISTORY](cards).length > 0 ? filter[FilterType.HISTORY](cards).length : '0'
      },
      {
        type: FilterType.FAVORITES,
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](cards).length > 0 ? filter[FilterType.FAVORITES](cards).length : '0'
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterContainer, this.#filterComponent, RenderPosition.BEFORE_END);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }
    this.#handleModelEvent();
    // this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
