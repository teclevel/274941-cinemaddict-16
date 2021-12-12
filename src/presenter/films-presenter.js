// import FilmsCardView from '../view/films-card-view';
// import FilmsPopupView from '../view/films-popup-view';
// import CommentView from '../view/comment-view';
// import { render, RenderPosition, remove } from '../render';
// import { getRandomInteger } from '../utility';
// import { generateComment } from '../generator-data';


// const MAX_NUMBER_COMMENTS = 5;
// const comments = Array.from({ length: MAX_NUMBER_COMMENTS }, generateComment);


// export default class FilmsPresenter {
//   #filmsListContainer = null;

//   #filmsCardComponent = null;
//   #filmsPopupComponent = null;

//   #filmsCard = null;

//   constructor(filmsListContainer) {
//     this.#filmsListContainer = filmsListContainer;
//   }

//   init = (card) => {
//     this.#filmsCard = card;

//     this.#filmsCardComponent = new FilmsCardView;
//     this.#filmsPopupComponent = new FilmsPopupView;

//     render(this.#filmsListContainer, this.#filmsCard, RenderPosition.BEFOREEND);
//     this.#renderFilmsCard(card);
//   }

//   #renderFilmsCard = (card) => {
//     const popup = new FilmsPopupView(card);
//     const filmsCard = new FilmsCardView(card);

//     const body = document.querySelector('body');

//     const closePopup = () => {
//       remove(popup);
//       body.classList.remove('hide-overflow');
//     };

//     const onEscKeyDown = (evt) => {
//       if (evt.key === 'Escape' || evt.key === 'Esc') {
//         evt.preventDefault();
//         closePopup();
//         document.removeEventListener('keydown', onEscKeyDown);
//       }
//     };

//     const openPopup = () => {
//       body.classList.add('hide-overflow');
//       const footer = document.querySelector('.footer');
//       render(footer, popup, RenderPosition.AFTEREND);

//       const commentContainer = document.querySelector('.film-details__comments-list');

//       for (let i = 0; i < getRandomInteger(0, MAX_NUMBER_COMMENTS); i++) {
//         render(commentContainer, new CommentView(comments[i]), RenderPosition.BEFOREEND);
//       }

//       document.addEventListener('keydown', onEscKeyDown);

//       popup.setClosePopupClickHandler(() => {
//         document.removeEventListener('keydown', onEscKeyDown);
//         closePopup();
//       });
//     };

//     filmsCard.setFilmClickHandler(() => {
//       openPopup();
//     });

//     render(this.#filmsListContainer, this.#filmsCardComponent, RenderPosition.BEFOREEND);
//   }
// }
