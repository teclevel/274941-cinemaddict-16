import { createElement } from '../render';

const createContent = () => (
  `<section class="films">
    <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container">
      </div>
    </section>
  </section>`
);

export default class ContainerFilms {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createContent();
  }

  removeElement() {
    this.#element = null;
  }
}
