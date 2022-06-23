import FilmCounterView from './view/films-counter-view';
import ProfileUserView from './view/profile-view';
import FilmsListPresenter from './presenter/films-list-presenter';
// import { generateDataCard } from './mock/card';
import { RenderPosition } from './const';
import { render } from './utils/render';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';
import ApiService from './api-service';
import PopupModel from './model/popup-model';

export const AUTHORIZATION = 'Basic 4ksdf9gguyersdghrt0s';
export const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';

export const main = document.querySelector('.main');
export const footer = document.querySelector('.footer');
const header = document.querySelector('.header');

const filmsModel = new FilmsModel(new ApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const popupModel = new PopupModel(new ApiService(END_POINT, AUTHORIZATION));

const boardPresenter = new FilmsListPresenter(main, filmsModel, filterModel, popupModel);
const filterPresenter = new FilterPresenter(main, filterModel, filmsModel, boardPresenter);
/* render(header, new ProfileUserView(cards), RenderPosition.BEFORE_END);
render(footer, new FilmCounterView(cards), RenderPosition.BEFORE_END);
 */
filterPresenter.init();
boardPresenter.init();
filmsModel.init();
