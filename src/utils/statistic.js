import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FilterType, RankLevels, userRank } from '../const';
import { Filter } from './filter';

export const getUserRank = (count) => {
  if (count === RankLevels.NOVICE.MIN) {
    return '';
  }
  if (count > RankLevels.NOVICE.MIN && count <= RankLevels.NOVICE.MAX) {
    return userRank.NOVICE;
  }
  if (count > RankLevels.FAN.MIN && count <= RankLevels.FAN.MAX) {
    return userRank.FAN;
  }
  if (count > RankLevels.MOVIE_BUFF.MIN) {
    return userRank.MOVIE_BUFF;
  }
};

export const convertMinutes = (timeMinutes, timeType) => {
  const hours = Math.trunc(timeMinutes / 60);
  const minutes = timeMinutes % 60;
  switch (timeType) {
    case 'hours':
      return hours;
    case 'minutes':
      return minutes;
  }
};

export const getSumDurationFilm = (data) => data.reduce((sum, { duration }) => (sum + duration), 0);

const joinArr = (arr) => {
  const newArr = [];
  for (const el of arr) {
    newArr.splice(newArr.length, 0, el);
  }
  return newArr.join().split(',');
};
// export const FilterGenres = {
//   // 'Musical', 'Western', 'Cartoon', 'Comedy'
//   [GenresType.MUSICAL]: (cards) => cards.filter((card) => card.genres === 'Musical').length,
//   [GenresType.WESTERN]: (cards) => cards.filter((card) => card.genres === 'Western').length,
//   [GenresType.CARTOON]: (cards) => cards.filter((card) => card.genres === 'Cartoon').length,
//   [GenresType.COMEDY]: (cards) => cards.filter((card) => card.genres === 'Comedy').length
// };


// const genreLabels = Object.values(GenresType);
// console.log(genreLabels);
export const getWatchedFilms = (data) => Filter[FilterType.HISTORY](data);

// Найти количество повторяющихся слов из массива 1 в массиве 2 и сложить получившееся количество в массив

export const getCountArr = (arr1, arr2) => {
  const countArr = [];
  for (const word of arr1) {
    countArr.push(arr2.filter((el) => el === word).length);
  }
  return countArr;
};

// Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы

export const renderChart = (statisticCtx, data) => {
  const watchedFilms = getWatchedFilms(data);
  const genresAll = joinArr(watchedFilms.map(({ genres }) => genres));
  const genreLabels = Array.from(new Set(genresAll));
  // console.log(genresAll);
  // console.log(genreLabels);

  const countArrGenre = getCountArr(genreLabels, genresAll);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genreLabels,
      datasets: [{
        data: countArrGenre,
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
};
