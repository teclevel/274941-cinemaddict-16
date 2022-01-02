import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ButtonShowMoreView from '../view/show-more-button-view';
import FilmsSortView from '../view/sort-view';
import FilmsListNoCardsView from '../view/films-list-no-cards-view';
import { render, remove } from '../utils/render';
import FilmPresenter from './film-presenter';
import { updateItem } from '../utils/common';
import { RenderPosition, SortType } from '../const';

const NUMBER_CARDS_PER_STEP = 5;

export default class FilmsListPresenter {
  #filmsContainer = null;
  #filmsModel = null;

  #filmsSortComponent = new FilmsSortView();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListNoCardsComponent = new FilmsListNoCardsView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButton = new ButtonShowMoreView();

  #boardCards = [];
  #renderedCards = NUMBER_CARDS_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardCards = [];

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
  }

  get cards(){
    return this.#filmsModel.cards;
  }

  init = (boardCards) => {
    this.#boardCards = [...boardCards];
    this.#sourcedBoardCards = [...boardCards];

    render(this.#filmsContainer, this.#filmsContainerComponent, RenderPosition.BEFORE_END);

    this.#renderBoard();
  }

  #renderFilmsList = () => {
    render(this.#filmsContainerComponent, this.#filmsListComponent, RenderPosition.BEFORE_END);
  }

  #renderFilmsListContainer = () => {
    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFORE_END);
  }

  #renderCardsList = () => {
    this.#boardCards.forEach((card, index, array) => {
      if (index < Math.min(array.length, NUMBER_CARDS_PER_STEP)) {
        this.#renderCard(card);
      }
    });
  }

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent, this.#handleCardChange, this.#handleModeChange);
    filmPresenter.init(card);
    this.#filmPresenter.set(card.id, filmPresenter);
  }

  #renderFilmsListNoCards = () => {
    render(this.#filmsContainerComponent, this.#filmsListNoCardsComponent, RenderPosition.BEFORE_END);
  }

  #renderFilmsSort = () => {
    render(this.#filmsContainerComponent, this.#filmsSortComponent, RenderPosition.BEFORE_BEGIN);
    this.#filmsSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderShowMoreButton = () => {
    render(this.#filmsListComponent, this.#showMoreButton, RenderPosition.BEFORE_END);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderBoard = () => {
    if (this.#boardCards.every((card) => !card)) {
      this.#renderFilmsListNoCards();
      return;
    }

    this.#renderFilmsList();
    this.#renderFilmsListContainer();
    this.#renderFilmsSort();
    this.#renderCardsList();

    if (this.#boardCards.length > NUMBER_CARDS_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #clearCardList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedCards = NUMBER_CARDS_PER_STEP;
    remove(this.#showMoreButton);
  }

  #handleShowMoreButtonClick = () => {
    this.#boardCards
      .slice(this.#renderedCards, this.#renderedCards + NUMBER_CARDS_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderedCards += NUMBER_CARDS_PER_STEP;

    if (this.#renderedCards >= this.#boardCards.length) {
      remove(this.#showMoreButton);
    }
  }

  #handleCardChange = (updatedCard) => {
    this.#boardCards = updateItem(this.#boardCards, updatedCard);
    this.#sourcedBoardCards = updateItem(this.#sourcedBoardCards, updatedCard);
    this.#filmPresenter.get(updatedCard.id).init(updatedCard);
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #sortCards = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#boardCards.sort((a, b) => b.year - a.year);
        break;
      case SortType.RATING:
        this.#boardCards.sort((a, b) => b.rating - a.rating);
        break;
      default:
        this.#boardCards = [...this.#sourcedBoardCards];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortCards(sortType);
    this.#clearCardList();
    this.#renderBoard();
  }
}
