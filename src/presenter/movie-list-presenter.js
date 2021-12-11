import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsCardView from '../view/films-card-view';
import ButtonShowMoreView from '../view/show-more-button-view';
import FilmsPopupView from '../view/films-popup-view';
import FilmsSortView from '../view/sort-view';
import CommentView from '../view/comment-view';
import FilmsListNoCardsView from '../view/films-list-no-cards-view';
import { render, RenderPosition, remove } from '../render';
import { getRandomInteger } from '../utility';
import { generateDataCard, generateComment } from '../generator-data';

const NUMBER_CARDS_PER_STEP = 5;
const MAX_NUMBER_COMMENTS = 5;
const comments = Array.from({ length: MAX_NUMBER_COMMENTS }, generateComment);


export default class FilmsPresenter {
  #filmsContainer = null;

  #filmsSortComponent = new FilmsSortView();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListNoCardsComponent = new FilmsListNoCardsView();
  #filmsListContainerComponent = new FilmsListContainerView();
  // #filmsCardComponent = new FilmsCardView();
  // #filmsPopupComponent = new FilmsPopupView();

  #filmsCards = [];

  constructor(filmsContainer) {
    this.#filmsContainer = filmsContainer;
  }

  init = (cards) => {
    this.#filmsCards = [...cards];

    render(this.#filmsContainer, this.#filmsContainerComponent, RenderPosition.BEFOREEND);
    // render(this.#filmsContainerComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
    // render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #renderCard = (card) => {
    const popup = new FilmsPopupView(card);
    const filmsCard = new FilmsCardView(card);

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
      const footer = document.querySelector('.footer');
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

    const buttonShowPopup = filmsCard.element.querySelector('.film-card__link');

    buttonShowPopup.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup();
    });


    render(this.#filmsListContainerComponent, filmsCard, RenderPosition.BEFOREEND);
  }

  #renderFilmsListNoCards = () => {
    render(this.#filmsContainerComponent, this.#filmsListNoCardsComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsSort = () => {
    render(this.#filmsContainerComponent, this.#filmsSortComponent, RenderPosition.BEFOREBEGIN);
  }

  // #renderFilmsPopup = () => {

  // }

  // #renderButtonShowMore = () => {

  // }

  #renderBoard = () => {
    if(this.#filmsCards.every((card) => !card)){
      this.#renderFilmsListNoCards();
      return;
    }

    this.#renderFilmsSort();

    // this.#filmsCards.forEach((card, index, array) => {
    //   if (index < Math.min(array.length, NUMBER_CARDS_PER_STEP)) {
    //     this.#renderCard(card);
    //   }
    // });

    // if (this.#filmsCards.length > NUMBER_CARDS_PER_STEP) {

    //   let renderedCards = NUMBER_CARDS_PER_STEP;

    //   const buttonShow = new ButtonShowMoreView();
    //   render(this.#filmsListComponent, buttonShow, RenderPosition.BEFOREEND);

    //   buttonShow.element.addEventListener('click', (evt) => {
    //     evt.preventDefault();
    //     this.#filmsCards
    //       .slice(renderedCards, renderedCards + NUMBER_CARDS_PER_STEP)
    //       .forEach((card) => this.#renderCard(card));

    //     renderedCards += NUMBER_CARDS_PER_STEP;

    //     if (renderedCards >= this.#filmsCards.length) {
    //       remove(buttonShow);
    //     }
    //   });
    // }
  }
}
