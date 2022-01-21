import { FilterType } from '../const';
import AbstractObservable from '../utils/abstract-observable';


export default class FilterModel extends AbstractObservable {
  #filter = FilterType.ALL_MOVIES;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
