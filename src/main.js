import MainNavigationView from './view/main-navigation-view';
import MovieCounterView from './view/movie-counter-view';
import ProfileUserView from './view/profile-view';
import FilmsSortView from './view/sort-view';
import FilmsContainerView from './view/films-container-view';
import FilmsCardView from './view/films-card-view';
import ButtonShowMoreView from './view/show-more-button-view';
import FilmsPopupView from './view/films-popup-view';
import CommentView from './view/comment-view';
import FilmsTitleView from './view/films-title-view';
import { generateDataCard, generateComment } from './generator-data';
import { RenderPosition, render } from './render';
import { getRandomInteger } from './utility';
import { generateFilter } from './filter';

const NUMBER_CARDS = 7;
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
      render(commentContainer, new CommentView(comments[i]).element, RenderPosition.BEFOREEND);
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


const renderBoard = (boardContainer, boardCards) => {

  const filmsList = boardContainer.element.querySelector('.films-list');
  const filmsListContainer = filmsList.querySelector('.films-list__container');

  const sortFilms = new FilmsSortView();

  render(boardContainer.element, sortFilms.element, RenderPosition.BEFOREBEGIN);

  if (boardCards.every((element) => !element)) {
    render(filmsList, new FilmsTitleView().element, RenderPosition.AFTERBEGIN);
    sortFilms.element.remove();
    sortFilms.removeElement();
    filmsListContainer.remove();
  }

  for (let i = 0; i < Math.min(boardCards.length, NUMBER_CARDS_PER_STEP); i++) {
    renderCard(filmsListContainer, boardCards[i]);
  }

  if (boardCards.length > NUMBER_CARDS_PER_STEP) {

    let renderedCards = NUMBER_CARDS_PER_STEP;

    const buttonShow = new ButtonShowMoreView();
    render(filmsList, buttonShow.element, RenderPosition.BEFOREEND);


    buttonShow.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      boardCards
        .slice(renderedCards, renderedCards + NUMBER_CARDS_PER_STEP)
        .forEach((card) => renderCard(filmsListContainer, card));

      renderedCards += NUMBER_CARDS_PER_STEP;

      if (renderedCards >= boardCards.length) {
        buttonShow.element.remove();
        buttonShow.removeElement();
      }
    });
  }
};

render(header, new ProfileUserView().element, RenderPosition.BEFOREEND);
render(main, new MainNavigationView(filter).element, RenderPosition.BEFOREEND);

const filmsContainer = new FilmsContainerView();
render(main, filmsContainer.element, RenderPosition.BEFOREEND);

renderBoard(filmsContainer, cards);

render(footer, new MovieCounterView(cards).element, RenderPosition.BEFOREEND);
