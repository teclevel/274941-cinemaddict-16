import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ButtonShowMoreView from '../view/show-more-button-view';
import FilmsSortView from '../view/sort-view';
import FilmsListNoCardsView from '../view/films-list-no-cards-view';
import { render, RenderPosition, remove } from '../render';
import FilmPresenter from './film-presenter';
import { updateItem } from '../utils/common';


const NUMBER_CARDS_PER_STEP = 5;

export default class FilmsListPresenter {
  #filmsContainer = null;

  #filmsSortComponent = new FilmsSortView();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListNoCardsComponent = new FilmsListNoCardsView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButton = new ButtonShowMoreView();

  #filmsCards = [];
  #renderedCards = NUMBER_CARDS_PER_STEP;
  #cardPresenter = new Map();///////////////////

  constructor(filmsContainer) {
    this.#filmsContainer = filmsContainer;
  }

  init = (cards) => {
    this.#filmsCards = [...cards];

    render(this.#filmsContainer, this.#filmsContainerComponent, RenderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #renderFilmsList = () => {
    render(this.#filmsContainerComponent, this.#filmsListComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsListContainer = () => {
    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFOREEND);
  }

  #renderCard = (card) => {
    const cardPresenter = new FilmPresenter(this.#filmsListContainerComponent, this.#handleCardChange);
    cardPresenter.init(card);
    this.#cardPresenter.set(card.id, cardPresenter);
  }

  #clearCardList = () => {////////////////////////////
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    this.#renderedCards = NUMBER_CARDS_PER_STEP;
    remove(this.#showMoreButton);
  }

  #renderCardsList = () => {
    this.#filmsCards.forEach((card, index, array) => {
      if (index < Math.min(array.length, NUMBER_CARDS_PER_STEP)) {
        this.#renderCard(card);
      }
    });
  }

  #renderFilmsListNoCards = () => {
    render(this.#filmsContainerComponent, this.#filmsListNoCardsComponent, RenderPosition.BEFOREEND);
  }

  #renderFilmsSort = () => {
    render(this.#filmsContainerComponent, this.#filmsSortComponent, RenderPosition.BEFOREBEGIN);
  }

  #handleShowMoreButtonClick = () => {
    this.#filmsCards
      .slice(this.#renderedCards, this.#renderedCards + NUMBER_CARDS_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderedCards += NUMBER_CARDS_PER_STEP;

    if (this.#renderedCards >= this.#filmsCards.length) {
      remove(this.#showMoreButton);
    }
  }

  #renderShowMoreButton = () => {
    render(this.#filmsListComponent, this.#showMoreButton, RenderPosition.BEFOREEND);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderBoard = () => {
    if (this.#filmsCards.every((card) => !card)) {
      this.#renderFilmsListNoCards();
      return;
    }

    this.#renderFilmsList();
    this.#renderFilmsListContainer();
    this.#renderFilmsSort();
    this.#renderCardsList();

    if (this.#filmsCards.length > NUMBER_CARDS_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  // //////////////////////////

  #handleCardChange = (updatedCard) => {
    this.#filmsCards = updateItem(this.#filmsCards, updatedCard);
    this.cardPresenter.get(updatedCard.id).init(updatedCard);
  }
}
