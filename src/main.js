import { RenderPosition, renderComponent } from './render';
import MainNavigation from './view/main-navigation';
import ProfileUser from './view/profile';
import SortFilms from './view/sort';
import ContainerFilms from './view/content';
import FilmsCard from './view/films-card';
import ButtonShowMore from './view/button-show-more';
import FilmsPopup from './view/films-popup';
import { generateDataCard, generateComment } from './generator-data';
import Comment from './view/comment';
import { getRandomInteger } from './utility';
import { generateFilter } from './filter';
import Statistic from './view/statistic';


const NUMBER_CARDS = 6;
const NUMBER_CARDS_PER_STEP = 5;
const MAX_NUMBER_COMMENTS = 5;

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
const dataPopup = cards[0];
const filter = generateFilter(cards);
const comments = Array.from({ length: NUMBER_CARDS }, generateComment);

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');


renderComponent(header, new ProfileUser());
renderComponent(main, new MainNavigation(filter));
renderComponent(main, new SortFilms());
renderComponent(main, new ContainerFilms);
renderComponent(footer, new Statistic(cards));


const filmsContainer = main.querySelector('.films-list');
const films = filmsContainer.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, NUMBER_CARDS_PER_STEP); i++) {
  renderComponent(films, new FilmsCard(cards[i]));
}

if (cards.length > NUMBER_CARDS_PER_STEP) {

  let renderedCards = NUMBER_CARDS_PER_STEP;

  renderComponent(filmsContainer, new ButtonShowMore);

  const buttonShow = filmsContainer.querySelector('.films-list__show-more');

  buttonShow.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCards, renderedCards + NUMBER_CARDS_PER_STEP)
      .forEach((card) => renderComponent(films, new FilmsCard(card)));

    renderedCards += NUMBER_CARDS_PER_STEP;

    if (renderedCards > cards.length) {
      buttonShow.remove();
    }
  });
}

const openPopup = document.querySelector('.film-card__link');

openPopup.addEventListener('click', (evt) => {
  evt.preventDefault();
  renderComponent(footer, new FilmsPopup(dataPopup), RenderPosition.AFTEREND);

  const commentContainer = document.querySelector('.film-details__comments-list');

  for (let i = 0; i < getRandomInteger(0, MAX_NUMBER_COMMENTS); i++) {
    renderComponent(commentContainer, new Comment(comments[i]));
  }

  const buttonClose = document.querySelector('.film-details__close-btn');
  const popup = document.querySelector('.film-details');
  buttonClose.addEventListener('click', () => {
    popup.remove();
  });
});
