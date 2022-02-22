import FilmsListView from '../view/films-list-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListContainerView from '../view/films-list-container-view';
import ButtonShowMoreView from '../view/show-more-button-view';
import FilmsSortView from '../view/sort-view';
import FilmsListNoCardsView from '../view/films-list-no-cards-view';
import { render, remove } from '../utils/render';
import { FilterType, RenderPosition, SortType, UpdateType, UserAction } from '../const';
import { filter } from '../utils/filter';
import LoadingView from '../view/loading-view';
import FilmsCardView from '../view/films-card-view';
import ContainerPopupView from '../view/containerPopup';
import PopupPresenter from './popup-presenter';
import { footer } from '../main';

export const ModePopup = {
  IsLoadingComments: true,
  isClosePopup: true,
};

const NUMBER_CARDS_PER_STEP = 5;

export default class FilmsListPresenter {
  #filmsContainer = null;
  #filmsCardComponent = null;
  #filmsModel = null;
  #filterModel = null;
  #popupModel = null;
  // #cards = null;
  #card = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #popupContainerComponent = new ContainerPopupView();
  #popupContainer = render(footer, this.#popupContainerComponent, RenderPosition.AFTER_END);
  #popupPresenter = null;

  #loadingComponent = new LoadingView();
  #noFilmsComponent = null;
  #showMoreButtonComponent = null;
  #filmsSortComponent = null;

  #renderedCardCount = NUMBER_CARDS_PER_STEP;
  #filmsComponent = new Map();
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL_MOVIES;
  #isLoading = true;

  constructor(filmsContainer, filmsModel, filterModel, popupModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#popupModel = popupModel;
  }

  get cards() {
    this.#filterType = this.#filterModel.filter;
    const cards = this.#filmsModel.cards;
    const filteredCards = filter[this.#filterType](cards);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredCards.sort((a, b) => b.dateRelease - a.dateRelease);
      case SortType.RATING:
        return filteredCards.sort((a, b) => b.rating - a.rating);
    }

    return filteredCards;
  }

  init = () => {
    render(this.#filmsContainer, this.#filmsContainerComponent, RenderPosition.BEFORE_END);

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);


    this.#renderBoard();
  }

  destroy = () => {
    this.#clearBoard({ resetRenderedCardCount: true }, { resetSortType: true });

    remove(this.#filmsListContainerComponent);
    remove(this.#filmsListComponent);
    remove(this.#filmsContainerComponent);

    this.#filmsModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #renderFilmsList = () => {
    render(this.#filmsContainerComponent, this.#filmsListComponent, RenderPosition.BEFORE_END);
  }

  #renderFilmsListContainer = () => {
    render(this.#filmsListComponent, this.#filmsListContainerComponent, RenderPosition.BEFORE_END);
  }

  #renderCard = (card) => {
    this.#filmsCardComponent = new FilmsCardView(card);
    render(this.#filmsListContainerComponent, this.#filmsCardComponent, RenderPosition.BEFORE_END);
    this.#filmsComponent.set(card.id, this.#filmsCardComponent);

    this.#filmsCardComponent.setFilmClickHandler(this.#handleCardClick);

    this.#filmsCardComponent.setAddToWatchClickHandler(this.#handleAddToWatchClick);
    this.#filmsCardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmsCardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
  }

  #initPopup = () => {
    console.log('initPopup',this.#card);
    this.#popupPresenter = new PopupPresenter(this.#popupContainerComponent, this.#handleViewAction, this.#card);
    this.#popupModel.init(this.#card.id);
    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#popupModel.addObserver(this.#handleModelEvent);
  }

  // #initComments = (card) => {
  // this.#popupModel.init(card.id);
  // this.#popupModel.addObserver(this.#handleModelEvent);
  // }

  #handleCardClick = (card) => {
    this.#card = card;
    if (!ModePopup.isClosePopup) {
      this.destroyPopup();
    }

    this.#initPopup();
    // this.#initComments(card);
    this.#showPopup();
  }

  #showPopup = () => {
    if (ModePopup.IsLoadingComments) {
      console.log('Loading comments');
      return;
    }

    if (ModePopup.isClosePopup) {
      this.#popupPresenter.showPopup();
    }
  }

  destroyPopup = () => {
    if (this.#popupPresenter) {
      this.#popupPresenter.closePopup();
      this.#popupModel.removeObserver(this.#handleModelEvent);
      this.#filmsModel.removeObserver(this.#handleModelEvent);

    }
  }

  #handleAddToWatchClick = (card) => {
    this.#handleViewAction(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      { ...card, isAddedToWatch: !card.isAddedToWatch });
  }

  #handleWatchedClick = (card) => {
    this.#handleViewAction(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      { ...card, isWatched: !card.isWatched });
  }

  #handleFavoriteClick = (card) => {
    this.#handleViewAction(
      UserAction.UPDATE_CARD,
      UpdateType.MINOR,
      { ...card, isFavorite: !card.isFavorite });
  }

  #renderCards = (cards) => {
    cards.forEach((card) => this.#renderCard(card));
  }

  #renderNoFilms = () => {
    this.#noFilmsComponent = new FilmsListNoCardsView(this.#filterType);
    render(this.#filmsContainerComponent, this.#noFilmsComponent, RenderPosition.BEFORE_END);
  }

  #renderLoadingFilms = () => {
    render(this.#filmsContainerComponent, this.#loadingComponent, RenderPosition.BEFORE_END);
  }

  #renderFilmsSort = () => {
    this.#filmsSortComponent = new FilmsSortView(this.#currentSortType);
    this.#filmsSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#filmsContainerComponent, this.#filmsSortComponent, RenderPosition.BEFORE_BEGIN);
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ButtonShowMoreView();
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
    render(this.#filmsListComponent, this.#showMoreButtonComponent, RenderPosition.BEFORE_END);
  }

  #renderBoard = () => {
    const cards = this.cards;
    const cardCount = this.cards.length;

    if (this.#isLoading) {
      this.#renderLoadingFilms();
      return;
    }

    if (cardCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderFilmsSort();
    this.#renderFilmsList();
    this.#renderFilmsListContainer();
    this.#renderCards(cards.slice(0, Math.min(cardCount, this.#renderedCardCount)));

    if (cardCount > this.#renderedCardCount) {
      this.#renderShowMoreButton();
    }
  }

  #clearBoard = ({ resetRenderedCardCount = false, resetSortType = false } = {}) => {
    const cardCount = this.cards.length;

    this.#filmsComponent.forEach((component) => remove(component));
    this.#filmsComponent.clear();

    remove(this.#filmsSortComponent);
    remove(this.#showMoreButtonComponent);
    remove(this.#loadingComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedCardCount) {
      this.#renderedCardCount = NUMBER_CARDS_PER_STEP;
    } else {
      this.#renderedCardCount = Math.min(cardCount, this.#renderedCardCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        try {
          await this.#filmsModel.updateCard(updateType, update);
        } catch (err) {
          console.log('ошибка обновления');
        }
        break;

      case UserAction.ADD_COMMENT:
        try {
          await this.#popupModel.addComment(updateType, update);
        } catch (err) {
          console.log('ошибка добавления комментария');
        }
        break;

      case UserAction.DELETE_COMMENT:
        try {
          await this.#popupModel.deleteComment(updateType, update);
        } catch (err) {
          console.log('ошибка удаления комментария');
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {//обновленные данные
    switch (updateType) {
      // case UpdateType.PATCH:
      //   // this.#card = data;
      //   this.destroyPopup();
      //   this.#initPopup(data);
      //  // this.#initComments(data);
      //   this.#showPopup();
      //   break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        if (!ModePopup.isClosePopup) {// попап открыт
          if (data){
            this.#card = data;
          }
          this.destroyPopup();
          this.#initPopup();
          // this.#initComments(data);
          this.#showPopup();
        }

        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedCardCount: true, resetSortType: true });
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.INIT_COMMENTS:
        this.#card.comments = this.#popupModel.comments;
        ModePopup.IsLoadingComments = false;
        // remove(this.#loadingComponent); //удалить заглушку загрузки коментариев
        this.#showPopup();
        break;
    }
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBoard({ resetRenderedCardCount: true });
    this.#renderBoard();
    this.destroyPopup();
  }

  #handleShowMoreButtonClick = () => {
    const cardCount = this.cards.length;
    const newRenderedCardCount = Math.min(cardCount, this.#renderedCardCount + NUMBER_CARDS_PER_STEP);
    const cards = this.cards.slice(this.#renderedCardCount, newRenderedCardCount);

    this.#renderCards(cards);
    this.#renderedCardCount = newRenderedCardCount;

    if (this.#renderedCardCount >= cardCount) {
      remove(this.#showMoreButtonComponent);
    }
  }
}
