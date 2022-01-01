import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmPresenter from './film-presenter';
import ButtonShowMoreView from '../view/show-more-button-view';
import FilmsSortView from '../view/sort-view';
import FilmsListNoCardsView from '../view/films-list-no-cards-view';
import { render, remove } from '../utils/render';
import { RenderPosition, SortType, UpdateType, UserAction } from '../const';

const NUMBER_CARDS_PER_STEP = 5;

export default class FilmsListPresenter {
  #filmsContainer = null;
  #filmsModel = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListNoCardsComponent = new FilmsListNoCardsView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsSortComponent = null;
  #showMoreButton = null;

  // #boardCards = [];
  #renderedCardCount = NUMBER_CARDS_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  // #sourcedBoardCards = [];

  constructor(filmsContainer, filmsModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get cards() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel].sort((a, b) => b.year - a.year);
      case SortType.RATING:
        return [...this.#filmsModel].sort((a, b) => b.rating - a.rating);
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

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(card);
    this.#filmPresenter.set(card.id, filmPresenter);
  }

  #renderCards = (cards) => {
    cards.forEach((card) => this.#renderCard(card));
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
  }

  #renderBoard = () => {
    const cards = this.cards;
    const cardCount = cards.length;

    if (cardCount === 0) {
      this.#renderFilmsListNoCards();
      return;
    }

    this.#renderFilmsList();///////////////////////
    this.#renderFilmsListContainer();/////////////////////
    this.#renderFilmsSort();

    // Теперь, когда _renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу TASK_COUNT_PER_STEP на свойство _renderedTaskCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек

    this.#renderCards(cards.slice(0, Math.min(cardCount, this.#renderedCardCount)));

    if (cardCount > this.#renderedCardCount) {
      this.#renderShowMoreButton();
    }
  }

  #handleShowMoreButtonClick = () => {
    const filmsCount = this.cards.length;
    const newRenderedFilmsCount = Math.min(filmsCount + this.#renderedCardCount + NUMBER_CARDS_PER_STEP);
    const cards = this.cards.slice(this.#renderedCardCount, newRenderedFilmsCount);

    this.#renderCards(cards);
    this.#renderedCardCount = newRenderedFilmsCount;

    if (this.#renderedCardCount >= filmsCount) {
      remove(this.#showMoreButton);
    }
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  };

  // #handleCardChange = (updatedCard) => {
  //   // this.#boardCards = updateItem(this.#boardCards, updatedCard);
  //   // this.#sourcedBoardCards = updateItem(this.#sourcedBoardCards, updatedCard);
  //   this.#filmPresenter.get(updatedCard.id).init(updatedCard);
  // }

  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#filmsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#filmsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#filmsModel.deleteTask(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
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
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard()
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard();
    this.#renderBoard();
  }
}
