const filterMap = {
  addWatch: (films) => films.filter((film) => film.isAddedToWatch).length,
  favorite: (films) => films.filter((film) => film.isFavorite).length,
  watched: (films) => films.filter((film) => film.isWatched).length
};

export const generateFilter = (films) => Object.entries(filterMap).map(
  ([filterName, countTasks]) => ({
    name: filterName,
    count: countTasks(films),
  }),
);
