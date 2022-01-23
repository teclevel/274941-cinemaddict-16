export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const RenderPosition = {
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
};

export const EMOJIS = ['smile', 'sleeping', 'puke', 'angry'];

export const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  ADD_CARD: 'ADD_CARD',
  DELETE_CARD: 'DELETE_CARD',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const FilterType = {
  ALL_MOVIES: 'all',
  WATCH_LIST: 'watchList',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATISTIC: 'stats'
};

export const GenresType = {
  MUSICAL: 'Musical',
  WESTERN: 'Western',
  CARTOON: 'Cartoon',
  COMEDY: 'Comedy'
};

export const noFilmsTextType = {
  [FilterType.ALL_MOVIES]: 'There are no movies in our database',
  [FilterType.WATCH_LIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

export const BLANK_DETAILS_FILM = {
  isUserEmoji: null,
  newComment: '',

  isWatched: false,
  isAddedToWatch: false,
  isFavorite: false
};

// export const StatisticPeriod = {
//   All_TIME: 'all-time',
//   TODAY: 'today',
//   WEEK: 'week',
//   MONTH: 'month',
//   YEAR: 'year'
// };

export const userRank = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie buff'
};


