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
import { generateFilter } from './filter';

const NUMBER_CARDS = 14;
const NUMBER_CARDS_PER_STEP = 5;
const MAX_NUMBER_COMMENTS = 5;

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
const filter = generateFilter(cards);
const comments = Array.from({ length: NUMBER_CARDS }, generateComment);

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');


renderComponent(header, createProfile(), RenderPosition.BEFOREEND);
renderComponent(main, createMainNavigation(filter), RenderPosition.BEFOREEND);
renderComponent(main, createSort(), RenderPosition.BEFOREEND);
renderComponent(main, createContent(), RenderPosition.BEFOREEND);

const filmsContainer = main.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, NUMBER_CARDS_PER_STEP); i++) {
  renderComponent(filmsContainer, createFilmsCard(cards[i]), RenderPosition.BEFOREEND);
}

if (cards.length > NUMBER_CARDS_PER_STEP) {

  let renderedCards = NUMBER_CARDS_PER_STEP;

  renderComponent(filmsContainer, createButtonShowMore(), RenderPosition.AFTEREND);
  const buttonShow = document.querySelector('.films-list__show-more');

  buttonShow.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCards, renderedCards + NUMBER_CARDS_PER_STEP)
      .forEach((card) => renderComponent(filmsContainer, createFilmsCard(card), RenderPosition.BEFOREEND));

    renderedCards += NUMBER_CARDS_PER_STEP;

    if (renderedCards > cards.length) {
      buttonShow.remove();
    }
  });

}

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
