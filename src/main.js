import { RenderPosition, renderComponent } from './render';
import { createMainNavigation } from './view/main-navigation';
import { createProfile } from './view/profile';
import { createSort } from './view/sort';
import { createContent } from './view/content';
import { createFilmsCard } from './view/films-card';
import { createButtonShowMore } from './view/button-show-more';
import { createFilmsPopup } from './view/films-popup';
import { generateDataCard, generateComment } from './generator-data';
import { createComment } from './view/comment';
import { getRandomInteger } from './utility';

const NUMBER_CARDS = 5;
const MAX_NUMBER_COMMENTS = 5;
const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
const comments = Array.from({ length: NUMBER_CARDS }, generateComment);

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');


renderComponent(header, createProfile(), RenderPosition.BEFOREEND);
renderComponent(main, createMainNavigation(), RenderPosition.BEFOREEND);
renderComponent(main, createSort(), RenderPosition.BEFOREEND);
renderComponent(main, createContent(), RenderPosition.BEFOREEND);

const filmsContainer = main.querySelector('.films-list__container');

for (let i = 0; i < NUMBER_CARDS; i++) {
  renderComponent(filmsContainer, createFilmsCard(cards[i]), RenderPosition.BEFOREEND);
}

renderComponent(filmsContainer, createButtonShowMore(), RenderPosition.AFTEREND);

const listLinkCards = document.querySelectorAll('.film-card__link');

for (const link of listLinkCards) {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderComponent(footer, createFilmsPopup(cards[1]), RenderPosition.AFTEREND);

    const commentContainer = document.querySelector('.film-details__comments-list');
    for (let i = 0; i < getRandomInteger(0, MAX_NUMBER_COMMENTS); i++) {
      renderComponent(commentContainer, createComment(comments[i]), RenderPosition.BEFOREEND);
    }
  });
}

// const comments = document.querySelectorAll('.film-details__comment');
