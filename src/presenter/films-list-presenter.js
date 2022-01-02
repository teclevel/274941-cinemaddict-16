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

  #filmsSortComponent = new FilmsSortView();
  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListNoCardsComponent = new FilmsListNoCardsView();
  #filmsListContainerComponent = new FilmsListContainerView();
<<<<<<< HEAD
  #showMoreButton = new ButtonShowMoreView();

  #boardCards = [];
  #renderedCards = NUMBER_CARDS_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardCards = [];
=======
  #filmsSortComponent = null;
  #showMoreButton = null;

  // #boardCards = [];
  #renderedCardCount = NUMBER_CARDS_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  // #sourcedBoardCards = [];
>>>>>>> parent of 1788da5 (модель)

  constructor(filmsContainer) {
    this.#filmsContainer = filmsContainer;
  }

<<<<<<< HEAD
  init = (boardCards) => {
    this.#boardCards = [...boardCards];
    this.#sourcedBoardCards = [...boardCards];
=======
  get cards() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel].sort((a, b) => b.year - a.year);
      case SortType.RATING:
        return [...this.#filmsModel].sort((a, b) => b.rating - a.rating);
    }

    return this.#filmsModel.cards;
  }
>>>>>>> parent of 1788da5 (модель)

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
<<<<<<< HEAD
=======
    
>>>>>>> parent of 1788da5 (модель)
    render(this.#filmsContainerComponent, this.#filmsSortComponent, RenderPosition.BEFORE_BEGIN);
    this.#filmsSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderShowMoreButton = () => {
    render(this.#filmsListComponent, this.#showMoreButton, RenderPosition.BEFORE_END);
    this.#showMoreButton.setClickHandler(this.#handleShowMoreButtonClick);
<<<<<<< HEAD
=======
  }

  // #clearCardList = () => {
  //   this.#filmPresenter.forEach((presenter) => presenter.destroy());
  //   this.#filmPresenter.clear();
  //   this.#renderedCardCount = NUMBER_CARDS_PER_STEP;
  //   remove(this.#showMoreButton);////
  // }

  // #renderCardList = () => {
  //   const cardCount = this.cards.length;
  //   const cards = this.tasks.slice(0, Math.min(cardCount, NUMBER_CARDS_PER_STEP));

  //   this.#renderCards(cards);
  //   if (cardCount > NUMBER_CARDS_PER_STEP) {
  //     this.#renderShowMoreButton();
  //   }
  // }

  #clearBoard = ({ resetRenderedCardCount = false, resetSortType = false } = {}) => {
    const cardCount = this.card.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();


    remove(this.#filmsSortComponent);
    remove(this.#filmsListNoCardsComponent);
    remove(this.#showMoreButton);

    if (resetRenderedCardCount) {
      this.#renderedCardCount = NUMBER_CARDS_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderedCardCount = Math.min(cardCount, this.#renderedCardCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
>>>>>>> parent of 1788da5 (модель)
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

<<<<<<< HEAD
    if (this.#renderedCards >= this.#boardCards.length) {
=======
    if (this.#renderedCardCount >= filmsCount) {
>>>>>>> parent of 1788da5 (модель)
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
