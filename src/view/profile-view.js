import AbstractView from './abstract-view';
import { Filter } from '../utils/filter';
import { getUserRank } from '../utils/statistic';
import { FilterType } from '../const';

const createProfileTemplate = (data) => {
  const userRank = getUserRank(Filter[FilterType.HISTORY](data).length);
  return `<section class="header__profile profile">
    <p class="profile__rating">${userRank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

export default class ProfileUserView extends AbstractView {

  constructor(cards) {
    super();
    this._data = cards;
  }

  get template() {
    return createProfileTemplate(this._data);
  }
}
