// import FilmsContainerView from './view/films-container-view';
// import FilmsBlockView from './view/films-block-view';
// import FilmsListContainerView from './view/films-list-container-view';
// import FilmsCardView from './view/films-card-view';
// import ButtonShowMoreView from './view/show-more-button-view';
// import FilmsPopupView from './view/films-popup-view';
// import CommentView from './view/comment-view';
// import FilmsSortView from '../view/sort-view';
// import { render, RenderPosition } from '../render';

// const NUMBER_CARDS_PER_STEP = 5;


// export default class BoardPresenter {
//   #boardContainer = null;

//   #filmsContainerComponent = new FilmsContainerView();
//   #filmsBlockComponent = new FilmsBlockView();
//   #filmsListContainerComponent = new FilmsListContainerView();
//   #filmsCardComponent = new FilmsCardView();
//   #filmsPopupComponent = new FilmsPopupView();
//   #filmsSortComponent = new FilmsSortView();

//   #boardCards = [];

//   constructor(boardContainer) {
//     this.#boardContainer = boardContainer;
//   }

//   init = (boardCards) => {
//     this.#boardCards = [...boardCards];

//     render(this.#boardContainer, this.#filmsContainerComponent, RenderPosition.BEFOREEND);
//     render(this.#filmsCardComponent, FilmsBlockView, RenderPosition.BEFOREEND);

//     this.#renderBoard();
//   }

//   #renderFilmsContainer = () => {

//   }

//   #renderFilmsBlock = () => {

//   }

//   #renderFilmsCard = (from, to) => {
//     this.#boardCards
//       .slice()
//       .forEach()

//   }

//   #renderFilmsPopup = () => {

//   }

//   #renderButtonShowMore = () => {

//   }

//   #renderFilmsSort = () => {
//     render(this.#filmsContainerComponent, this.#filmsSortComponent, RenderPosition.BEFOREBEGIN);

//   }

//   #renderBoard = () => {

//   }
// }
