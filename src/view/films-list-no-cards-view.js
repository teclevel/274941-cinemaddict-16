import { noFilmsTextType } from '../const';
import AbstractView from './abstract-view';

const createFilmsListNoCardsTemplate = (filterType) => {
  const noFilmsTextValue = noFilmsTextType[filterType];

  return (
    `<section class="films-list">
      <h2 class="films-list__title">${noFilmsTextValue}</h2>
    </section>`
  );
};


export default class FilmsListNoCardsView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createFilmsListNoCardsTemplate(this._data);
  }
}
