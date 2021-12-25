import AbstractView from './abstract-view';

const createFilmsListNoCardsTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title">There are no movies in our database</h2>
  </section>`
);

export default class FilmsListNoCardsView extends AbstractView {
  get template() {
    return createFilmsListNoCardsTemplate();
  }
}
