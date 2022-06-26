export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating'
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
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  INIT_COMMENTS: 'INIT_COMMENTS'
};

export const FilterType = {
  ALL_MOVIES: 'all',
  WATCH_LIST: 'watchList',
  HISTORY: 'history',
  FAVORITES: 'favorites',
  STATISTIC: 'stats'
};

// export const GenresType = {
//   MUSICAL: 'Musical',
//   WESTERN: 'Western',
//   CARTOON: 'Cartoon',
//   COMEDY: 'Comedy'
// };

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

export const StatisticMenu = {
  ALL_TIME: {
    id: 'all-time',
    text: 'All time'
  },
  TODAY: {
    id: 'today',
    text: 'Today'
  },
  WEEK: {
    id: 'week',
    text: 'Week'
  },
  MONTH: {
    id: 'month',
    text: 'Month'
  },
  YEAR: {
    id: 'year',
    text: 'Year'
  }
};

export const userRank = {
  NOVICE: 'Novice',
  FAN: 'Fan',
  MOVIE_BUFF: 'Movie buff'
};

export const RankLevels = {
  NOVICE: {
    MIN: 0,
    MAX: 10
  },
  FAN: {
    MIN: 10,
    MAX: 20
  },
  MOVIE_BUFF: {
    MIN: 20
  }
};
