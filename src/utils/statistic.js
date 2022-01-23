import { GenresType, userRank } from '../const';

const NO_RANK = 0;
const MIN_NOVICE = 0;
const MAX_NOVICE = 10;
const MIN_FAN = 10;
const MAX_FAN = 20;
const MIN_MOVIE_BUFF = 20;

export const getUserRank = (count) => {
  if (count === NO_RANK) {
    return '';
  }
  if (count > MIN_NOVICE && count <= MAX_NOVICE) {
    return userRank.NOVICE;
  }
  if (count > MIN_FAN && count <= MAX_FAN) {
    return userRank.FAN;
  }
  if (count > MIN_MOVIE_BUFF) {
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

export const getSumDurationFilm = (data) => data.reduce((sum, time) => (sum + time.duration), 0);

// export const FilterGenres = {
//   // 'Musical', 'Western', 'Cartoon', 'Comedy'
//   [GenresType.MUSICAL]: (cards) => cards.filter((card) => card.genres === 'Musical').length,
//   [GenresType.WESTERN]: (cards) => cards.filter((card) => card.genres === 'Western').length,
//   [GenresType.CARTOON]: (cards) => cards.filter((card) => card.genres === 'Cartoon').length,
//   [GenresType.COMEDY]: (cards) => cards.filter((card) => card.genres === 'Comedy').length
// };

