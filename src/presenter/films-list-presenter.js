import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ButtonShowMoreView from '../view/show-more-button-view';
import FilmsSortView from '../view/sort-view';
import FilmsListNoCardsView from '../view/films-list-no-cards-view';
import { render, remove } from '../utils/render';
import FilmPresenter from './film-presenter';
import { RenderPosition, SortType, UpdateType, UserAction } from '../const';

const NUMBER_CARDS_PER_STEP = 5;

export default class FilmsListPresenter {
  #filmsContainer = null;
  #filmsModel = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListNoCardsComponent = new FilmsListNoCardsView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #showMoreButtonComponent = null;
  #filmsSortComponent = null;

  #renderedCards = NUMBER_CARDS_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get cards() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.cards].sort((a, b) => b.year - a.year);
      case SortType.RATING:
        return [...this.#filmsModel.cards].sort((a, b) => b.rating - a.rating);
    }

    return this.#filmsModel.cards;
  }

  init = () => {
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
    this.cards.forEach((card, index, array) => {
      if (index < Math.min(array.length, NUMBER_CARDS_PER_STEP)) {
        this.#renderCard(card);
      }
    });
  }

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(card);
    this.#filmPresenter.set(card.id, filmPresenter);
  }

  #renderFilmsListNoCards = () => {
    render(this.#filmsContainerComponent, this.#filmsListNoCardsComponent, RenderPosition.BEFORE_END);
  }

  #renderFilmsSort = () => {
    this.#filmsSortComponent = new FilmsSortView(this.#currentSortType);
    this.#filmsSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#filmsContainerComponent, this.#filmsSortComponent, RenderPosition.BEFORE_BEGIN);
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ButtonShowMoreView();
    render(this.#filmsListComponent, this.#showMoreButtonComponent, RenderPosition.BEFORE_END);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderBoard = () => {
    if (this.cards.every((card) => !card)) {
      this.#renderFilmsListNoCards();
      return;
    }

    this.#renderFilmsList();
    this.#renderFilmsListContainer();
    this.#renderFilmsSort();
    this.#renderCardsList();

    if (this.cards.length > NUMBER_CARDS_PER_STEP) {
      this.#renderShowMoreButton();
    }
  }

  #clearBoard = ({ resetRenderedCardCount = false, resetSortType = false } = {}) => {
    const cardCount = this.cards.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#filmsSortComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedCardCount) {
      this.#renderedCards = NUMBER_CARDS_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this.#renderedCards = Math.min(cardCount, this.#renderedCards);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleShowMoreButtonClick = () => {
    this.cards
      .slice(this.#renderedCards, this.#renderedCards + NUMBER_CARDS_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderedCards += NUMBER_CARDS_PER_STEP;

    if (this.#renderedCards >= this.cards.length) {
      remove(this.#showMoreButtonComponent);
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this.#filmsModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_CARD:
        this.#filmsModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this.#filmsModel.deleteCard(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedCardCount: true, resetSortType: true });
        this.#renderBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({ resetRenderedCardCount: true });
    this.#renderBoard();
  }
}
