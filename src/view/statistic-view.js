import { FilterType } from '../const';
import { filter } from '../utils/filter';
import { getUserRank, convertMinutes, getSumDurationFilm } from '../utils/statistic';
import SmartView from './abstract-view';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы

const renderChart = (statisticCtx) => {
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: ['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series'],
      datasets: [{
        data: [11, 8, 7, 4, 3],
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
}


const createStatisticTemplate = (data) => {
  const rank = getUserRank(filter[FilterType.HISTORY](data).length);
  const watched = filter[FilterType.HISTORY](data).length;

  //////////////////////////////
  const totalDuration = getSumDurationFilm(data);
  const totalDurationHour = convertMinutes(totalDuration, 'hours');
  const totalDurationMinutes = convertMinutes(totalDuration, 'minutes');
  const genreTop = 'Cartoon';
  //////////////////////////////

  return `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watched} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${totalDurationHour} <span class="statistic__item-description">h</span> ${totalDurationMinutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${genreTop}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas id="myChart" width="400"></canvas>
      </div>

    </section>`;
};


export default class StatisticView extends SmartView {
  #chart = null;

  constructor(cards) {
    super();
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
    statisticCtx.height = BAR_HEIGHT * 5;

    this.#chart = renderChart(statisticCtx);
  }
}
