import { RenderPosition, renderComponent } from './render';
import { createMainNavigation } from './view/main-navigation';
import { createProfile } from './view/profile';
import { createSort } from './view/sort';
import { createContent } from './view/content';
import { createFilmsCard } from './view/films-card';
import { createButtonShowMore } from './view/button-show-more';
import { createFilmsPopup } from './view/films-popup';
import { generateDataCard, generateComment} from './generator-data';

const NUMBER_CARDS = 5;

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');


renderComponent (header, createProfile(), RenderPosition.BEFOREEND);
renderComponent (main, createMainNavigation(), RenderPosition.BEFOREEND);
renderComponent (main, createSort(), RenderPosition.BEFOREEND);
renderComponent (main, createContent(), RenderPosition.BEFOREEND);
renderComponent (footer, createFilmsPopup(), RenderPosition.AFTEREND);

const filmsContainer = main.querySelector('.films-list__container');

for (let i = 0; i < NUMBER_CARDS; i++) {
  renderComponent(filmsContainer, createFilmsCard(), RenderPosition.BEFOREEND);
}

renderComponent(filmsContainer, createButtonShowMore(),RenderPosition.AFTEREND);
