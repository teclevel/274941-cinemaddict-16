import AbstractView from './abstract-view';

const createContainerPopupTemplate = () =>
  `<section class="film-details">
  </section>`;

export default class ContainerPopupView extends AbstractView {
  get template() {
    return createContainerPopupTemplate();
  }
}
