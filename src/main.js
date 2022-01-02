import MainNavigationView from './view/main-navigation-view';
import MovieCounterView from './view/movie-counter-view';
import ProfileUserView from './view/profile-view';
import FilmsListPresenter from './presenter/films-list-presenter';
import { generateDataCard } from './mock/card';
import { generateFilmsFilter } from './mock/filter';
import { RenderPosition } from './const';
import { render } from './utils/render';

const NUMBER_CARDS = 17;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
const filter = generateFilmsFilter(cards);

const boardPresenter = new FilmsListPresenter(main);

render(header, new ProfileUserView(), RenderPosition.BEFORE_END);
render(main, new MainNavigationView(filter), RenderPosition.BEFORE_END);
render(footer, new MovieCounterView(cards), RenderPosition.BEFORE_END);

boardPresenter.init();
