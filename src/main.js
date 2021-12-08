import MainNavigationView from './view/main-navigation-view';
import MovieCounterView from './view/movie-counter-view';
import ProfileUserView from './view/profile-view';
import FilmsSortView from './view/sort-view';
import FilmsContainerView from './view/films-container-view';
import FilmsCardView from './view/films-card-view';
import ButtonShowMoreView from './view/show-more-button-view';
import FilmsPopupView from './view/films-popup-view';
import CommentView from './view/comment-view';
import FilmsListContainerView from './view/films-list-container-view';
import FilmsBlockView from './view/films-block-view';
import { generateDataCard, generateComment } from './generator-data';
import { RenderPosition, render, remove } from './render';
import { getRandomInteger } from './utility';
import { generateFilter } from './filter';

const NUMBER_CARDS = 15;
const NUMBER_CARDS_PER_STEP = 5;
const MAX_NUMBER_COMMENTS = 5;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
const filter = generateFilter(cards);
const comments = Array.from({ length: NUMBER_CARDS }, generateComment);


const renderCard = (container, data) => {
  const popup = new FilmsPopupView(data);
  const card = new FilmsCardView(data);

  const body = document.querySelector('body');

  const closePopup = () => {
    remove(popup);
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
    render(footer, popup, RenderPosition.AFTEREND);

    const commentContainer = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < getRandomInteger(0, MAX_NUMBER_COMMENTS); i++) {
      render(commentContainer, new CommentView(comments[i]), RenderPosition.BEFOREEND);
    }

    document.addEventListener('keydown', onEscKeyDown);

    const buttonClosePopup = popup.element.querySelector('.film-details__close-btn');

    buttonClosePopup.addEventListener('click', () => {
      document.removeEventListener('keydown', onEscKeyDown);
      closePopup();
    });
  };

  const buttonShowPopup = card.element.querySelector('.film-card__link');

  buttonShowPopup.addEventListener('click', (evt) => {
    evt.preventDefault();
    openPopup();
  });


  render(container, card, RenderPosition.BEFOREEND);
};


const renderBoard = (boardContainer, boardCards) => {

  const filmsBlock = new FilmsBlockView();
  render(boardContainer, filmsBlock, RenderPosition.BEFOREEND);

  const filmsListContainer = new FilmsListContainerView();

  if (boardCards.every((element) => !element)) {
    const title = filmsBlock.element.querySelector('.films-list__title');
    title.classList.remove('visually-hidden');
    title.textContent = 'There are no movies in our database';

  } else {
    render(filmsBlock, filmsListContainer, RenderPosition.BEFOREEND);
    render(boardContainer, new FilmsSortView(), RenderPosition.BEFOREBEGIN);
  }

  boardCards.forEach((card, index) => {
    if (index < Math.min(boardCards.length, NUMBER_CARDS_PER_STEP)) {
      renderCard(filmsListContainer.element, card);
    }
  });

  if (boardCards.length > NUMBER_CARDS_PER_STEP) {

    let renderedCards = NUMBER_CARDS_PER_STEP;

    const buttonShow = new ButtonShowMoreView();
    render(filmsBlock, buttonShow, RenderPosition.BEFOREEND);

    buttonShow.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      boardCards
        .slice(renderedCards, renderedCards + NUMBER_CARDS_PER_STEP)
        .forEach((card) => renderCard(filmsListContainer.element, card));

      renderedCards += NUMBER_CARDS_PER_STEP;

      if (renderedCards >= boardCards.length) {
        remove(buttonShow);
      }
    });
  }
};

render(header, new ProfileUserView(), RenderPosition.BEFOREEND);
render(main, new MainNavigationView(filter), RenderPosition.BEFOREEND);

const filmsContainer = new FilmsContainerView();
render(main, filmsContainer, RenderPosition.BEFOREEND);

renderBoard(filmsContainer, cards);
render(footer, new MovieCounterView(cards), RenderPosition.BEFOREEND);
