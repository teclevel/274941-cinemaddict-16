import FilmsContainerView from './view/films-container-view';
import FilmsBlockView from './view/films-block-view';
import FilmsListContainerView from './view/films-list-container-view';
import FilmsCardView from './view/films-card-view';
import ButtonShowMoreView from './view/show-more-button-view';
import FilmsPopupView from './view/films-popup-view';
import CommentView from './view/comment-view';
import { render, RenderPosition } from '../render';


export default class BoardPresenter {
  #boardContainer = null;

  #filmsContainerComponent = new FilmsContainerView();
  #filmsBlockComponent = new FilmsBlockView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsCardComponent = new FilmsCardView();
  #filmsPopupComponent = new FilmsPopupView();

  #boardCards = [];

  constructor(boardContainer) {
    this.#boardContainer = boardContainer;
  }

  init = (boardCards) => {
    this.#boardCards = [...boardCards];
  }

  #renderFilmsContainer = () => {

  }

  #renderFilmsBlock =()=>{

  }

  #renderFilmsCard=()=>{

  }

  #renderFilmsPopup=()=>{

  }

  #renderButtonShowMore=()=>{

  }
}
