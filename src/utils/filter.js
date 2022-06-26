import { FilterType } from '../const';

export const Filter = {
  [FilterType.ALL_MOVIES]: (cards) => cards.filter((card) => card),
  [FilterType.WATCH_LIST]: (cards) => cards.filter((card) => card.isAddedToWatch),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.isWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorite),
  [FilterType.STATISTIC]: (cards) => cards.filter((card) => card)
};
