import { FilterType, GenresType, StatisticMenu } from '../const';
import { Filter } from '../utils/filter';
import { getUserRank, convertMinutes, getSumDurationFilm, renderChart, getWatchedFilms } from '../utils/statistic';
import SmartView from './smart-view';

const createStatisticTemplate = (data, isStatisticActive) => {
  const rank = getUserRank(Filter[FilterType.HISTORY](data).length);
  const watchedFilms = getWatchedFilms(data);
  const countWatched = watchedFilms.length;
  const genreTop = 'frhh';

  const totalDuration = getSumDurationFilm(watchedFilms);
  const totalDurationHour = convertMinutes(totalDuration, 'hours');
  const totalDurationMinutes = convertMinutes(totalDuration, 'minutes');

  const listMenu = Object.values(StatisticMenu)
    .map((item) =>
      `<input type="radio" class="statistic__filters-input visually-hidden" name="filter"
        id="${item.id}"
        value="${item.id}"
        ${isStatisticActive ? 'checked' : ''}>
      <label for="${item}" class="statistic__filters-label">${item.text}</label>`
    )
    .join('');

  return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>
        ${listMenu}
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${countWatched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">
            ${totalDurationHour}
            <span class="statistic__item-description">h</span>
            ${totalDurationMinutes}
            <span class="statistic__item-description">m</span>
          </p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${genreTop}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas id="myChart" width="1000"></canvas>
      </div>

    </section>`;
};


export default class StatisticView extends SmartView {
  #chart = null;
  isStatisticActive = null;

  constructor(cards, isStatisticActive) {
    super();
    this.isStatisticActive = isStatisticActive;
    this._data = cards;
    this.#setChart();
  }

  get template() {
    return createStatisticTemplate(this._data);
  }

  // removeElement = () => {
  //   super.removeElement();

  //   if (this.#datepicker) {
  //     this.#datepicker.destroy();
  //     this.#datepicker = null;
  //   }
  // // }

  // restoreHandlers = () => {
  //   this.#setDiagram();
  // }

  // #dateChangeHandler = ([dateFrom, dateTo]) => {
  //   if (!dateFrom || !dateTo) {
  //     return;
  //   }

  //   this.updateData({
  //     dateFrom,
  //     dateTo,
  //   });
  // }

  // #setDatepicker = () => {
  //   this.#datepicker = flatpickr(
  //     this.element.querySelector('.statistic__period-input'),
  //     {
  //       mode: 'range',
  //       dateFormat: 'j F',
  //       defaultDate: [this._data.dateFrom, this._data.dateTo],
  //       onChange: this.#dateChangeHandler,
  //     },
  //   );
  // }

  #setChart = () => {
    const BAR_HEIGHT = 50;
    const statisticCtx = this.element.querySelector('#myChart');
    statisticCtx.height = BAR_HEIGHT * 9;

    this.#chart = renderChart(statisticCtx, this._data);
  }
}
