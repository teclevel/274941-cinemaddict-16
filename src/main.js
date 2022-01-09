import FilmCounterView from './view/films-counter-view';
import ProfileUserView from './view/profile-view';
import FilmsListPresenter from './presenter/films-list-presenter';
import { generateDataCard } from './mock/card';
import { RenderPosition } from './const';
import { render } from './utils/render';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const NUMBER_CARDS = 7;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

filmsModel.cards = cards; //передает данные модели

const filterPresenter = new FilterPresenter(main, filterModel, filmsModel); //модель передается презентеру
const boardPresenter = new FilmsListPresenter(main, filmsModel, filterModel);

render(header, new ProfileUserView(), RenderPosition.BEFORE_END);
render(footer, new FilmCounterView(cards), RenderPosition.BEFORE_END);

filterPresenter.init();
boardPresenter.init();
