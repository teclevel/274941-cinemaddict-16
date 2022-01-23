import FilmCounterView from './view/films-counter-view';
import ProfileUserView from './view/profile-view';
import FilmsListPresenter from './presenter/films-list-presenter';
import { generateDataCard } from './mock/card';
import { RenderPosition } from './const';
import { render } from './utils/render';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const NUMBER_CARDS = 6;

export const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);
// console.log(cards);

// cards.filter =(cards)=>(item) => item.genres === 'Cartoon';

// const genres = (data) => data.map((card) => card.genres);


// const all = genres(cards).map((genre,)=>genre.concat(genre[index]));

// console.log(all);


// filter[FilterType.FAVORITES](cards).length


const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

filmsModel.cards = cards;

export const boardPresenter = new FilmsListPresenter(main, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);

render(header, new ProfileUserView(cards), RenderPosition.BEFORE_END);
render(footer, new FilmCounterView(cards), RenderPosition.BEFORE_END);

filterPresenter.init();
boardPresenter.init();
