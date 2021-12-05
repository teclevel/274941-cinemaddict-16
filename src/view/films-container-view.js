import { createElement } from '../render';

const createFilmsContainerTemplate = () => (
  `<section class="films">
      <section class="films-list">
      </section>
    </section>`
);

export default class FilmsContainerView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createFilmsContainerTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
