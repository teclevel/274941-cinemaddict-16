import FilmCounterView from './view/films-counter-view';
import ProfileUserView from './view/profile-view';
import FilmsListPresenter from './presenter/films-list-presenter';
import { generateDataCard } from './mock/card';
import { RenderPosition } from './const';
import { render } from './utils/render';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
// import StatisticView from './view/statistic-view';


const NUMBER_CARDS = 7;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

const cards = Array.from({ length: NUMBER_CARDS }, generateDataCard);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

filmsModel.cards = cards;

const filterPresenter = new FilterPresenter(main, filterModel, filmsModel);
const boardPresenter = new FilmsListPresenter(main, filmsModel, filterModel);
// const statisticComponent = new StatisticView();
// render(main, statisticComponent, RenderPosition.BEFORE_END);


// const handleSiteMenuClick = (menuItem) => {
//   switch (menuItem) {
//     case MenuItem.TASKS:
//       // Показать фильтры
//       // Показать доску
//       // Скрыть статистику
//       break;
//     case MenuItem.STATISTICS:
//       // Скрыть фильтры
//       // Скрыть доску
//       // Показать статистику
//       break;
//   }
// };


// const handleSiteMenuClick = (MenuItem) => {
//   console.log(MenuItem);
//   switch (MenuItem) {
//     case FilterType.ALL_MOVIES:
//     case FilterType.WATCH_LIST:
//     case FilterType.HISTORY:
//     case FilterType.FAVORITES:

//       break;
//     case FilterType.STATISTIC:

//       filterPresenter.destroy();
//       boardPresenter.destroy();
//       render(main, statisticComponent, RenderPosition.BEFORE_END);

//       break;
//   }

// };
// filterComponent.setFilterTypeChangeHandler(handleSiteMenuClick);

// #handleFilterTypeChange = (filterType) => {
//   if (this.#filterModel.filter === filterType) {
//     return;
//   }
//   this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
// }

render(header, new ProfileUserView(), RenderPosition.BEFORE_END);
render(footer, new FilmCounterView(cards), RenderPosition.BEFORE_END);

filterPresenter.init();
boardPresenter.init();
