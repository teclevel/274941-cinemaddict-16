import { createElement } from '../render';

// const listTitle = {
//   noData: 'There are no movies in our database',
//   noMovies: 'There are no movies to watch now',
//   noHistory: 'There are no watched movies now',
//   noFavorites: 'There are no favorite movies now'
// };
// скрытый заголовок
//  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

const createTileFilmsList = () => (
  `<h2 class="films-list__title">
    There are no movies in our database
  </h2>`
);

export default class TitleFilmsList {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createTileFilmsList();
  }

  removeElement() {
    this.#element = null;
  }
}
