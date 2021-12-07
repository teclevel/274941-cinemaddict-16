import AbstractView from './abstract-view';

const createFilmsBlockTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`
);

export default class FilmsBlockView extends AbstractView {
  get template() {
    return createFilmsBlockTemplate();
  }
}
