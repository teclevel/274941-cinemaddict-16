import MainNavigation from './view/main-navigation';
import Statistic from './view/statistic';
import ProfileUser from './view/profile';
import SortFilms from './view/sort';
import ContainerFilms from './view/films-container';
import FilmsCard from './view/films-card';
import ButtonShowMore from './view/button-show-more';
import FilmsPopup from './view/films-popup';
import Comment from './view/comment';
import { generateDataCard, generateComment } from './generator-data';
import { RenderPosition, render } from './render';
import { getRandomInteger } from './utility';
import { generateFilter } from './filter';


const NUMBER_CARDS = 6;
const NUMBER_CARDS_PER_STEP = 5;
const MAX_NUMBER_COMMENTS = 5;

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
const filter = generateFilter(cards);
const comments = Array.from({ length: NUMBER_CARDS }, generateComment);

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');


render(header, new ProfileUser().element, RenderPosition.BEFOREEND);
render(main, new MainNavigation(filter).element, RenderPosition.BEFOREEND);
render(main, new SortFilms().element, RenderPosition.BEFOREEND);
render(main, new ContainerFilms().element, RenderPosition.BEFOREEND);
render(footer, new Statistic(cards).element, RenderPosition.BEFOREEND);


const renderCard = (container, data) => {
  const popup = new FilmsPopup(data);
  const card = new FilmsCard(data);

  const body = document.querySelector('body');


  const closePopup = () => {
    popup.element.remove();
    popup.removeElement();
    body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const openPopup = () => {
    body.classList.add('hide-overflow');
    render(footer, popup.element, RenderPosition.AFTEREND);

    const commentContainer = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < getRandomInteger(0, MAX_NUMBER_COMMENTS); i++) {
      render(commentContainer, new Comment(comments[i]).element, RenderPosition.BEFOREEND);
    }

    document.addEventListener('keydown', onEscKeyDown);

    const buttonClosePopup = popup.element.querySelector('.film-details__close-btn');
    buttonClosePopup.addEventListener('click', () => {
      closePopup();
    });
  };

  const buttonShowPopup = card.element.querySelector('.film-card__link');

  buttonShowPopup.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup();
  });


  render(container, card.element, RenderPosition.BEFOREEND);
};


const filmsContainer = main.querySelector('.films-list');
const films = filmsContainer.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, NUMBER_CARDS_PER_STEP); i++) {
  renderCard(films, cards[i]);
}

if (cards.length > NUMBER_CARDS_PER_STEP) {

  let renderedCards = NUMBER_CARDS_PER_STEP;

  render(filmsContainer, new ButtonShowMore().element, RenderPosition.BEFOREEND);

  const buttonShow = filmsContainer.querySelector('.films-list__show-more');

  buttonShow.addEventListener('click', (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedCards, renderedCards + NUMBER_CARDS_PER_STEP)
      .forEach((card) => renderCard(films, card));

    renderedCards += NUMBER_CARDS_PER_STEP;

    if (renderedCards > cards.length) {
      buttonShow.remove();
    }
  });
}
