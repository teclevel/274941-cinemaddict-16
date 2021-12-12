import MainNavigationView from './view/main-navigation-view';
import MovieCounterView from './view/movie-counter-view';
import ProfileUserView from './view/profile-view';
import { generateDataCard } from './generator-data';
import { RenderPosition, render } from './render';
import { generateFilter } from './filter';
import FilmsListPresenter from './presenter/films-list-presenter';

const NUMBER_CARDS = 17;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
const filter = generateFilter(cards);

const boardPresenter = new FilmsListPresenter(main);

render(header, new ProfileUserView(), RenderPosition.BEFOREEND);
render(main, new MainNavigationView(filter), RenderPosition.BEFOREEND);
render(footer, new MovieCounterView(cards), RenderPosition.BEFOREEND);

boardPresenter.init(cards);
