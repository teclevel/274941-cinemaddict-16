import { UpdateType } from '../const';
import AbstractObservable from '../utils/abstract-observable';

export default class FilmsModel extends AbstractObservable {
  #apiService = null;
  #cards = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get cards() {
    return this.#cards;
  }

  init = async () => {
    try {
      const cards = await this.#apiService.cards;
      this.#cards = cards.map(this.#adaptToClient);

    } catch (err) {
      this.#cards = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateCard = async (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card'); //если нет фильма с таким id
    }

    try {
      const response = await this.#apiService.updateCard(update); // запрос к apiService на обновление
      const updatedCard = this.#adaptToClient(response);

      this.#cards = [
        ...this.#cards.slice(0, index),
        updatedCard,
        ...this.#cards.slice(index + 1),
      ];
      this._notify(updateType, updatedCard);

    } catch (err) {
      throw new Error('Can\'t update card');
    }
  }

  #adaptToClient = (card) => {
    const adaptedCard = {
      ...card,
      ...card['film_info'],
      ...card['user_details'],
      ...card['film_info'].release,
      actors: card['film_info'].actors.join(', '),
      age: card['film_info'].age_rating,
      genres: card['film_info'].genre,
      duration: card['film_info'].runtime,
      rating: card['film_info'].total_rating,
      writers: card['film_info'].writers.join(', '),
      dateRelease: new Date(card['film_info'].release.date),
      isAddedToWatch: card['user_details'].watchlist,
      isFavorite: card['user_details'].favorite,
      isWatched: card['user_details'].already_watched,
      releaseCountry: card['film_info'].release.release_country,
      watchingDate: new Date(card['user_details'].watching_date),
      alternativeTitle: card['film_info'].alternative_title,
    };

    delete adaptedCard['film_info'];
    delete adaptedCard['genre'];
    delete adaptedCard['runtime'];
    delete adaptedCard['total_rating'];
    delete adaptedCard['age_rating'];
    delete adaptedCard['user_details'];
    delete adaptedCard['release'];
    delete adaptedCard['already_watched'];
    delete adaptedCard['favorite'];
    delete adaptedCard['watchlist'];
    delete adaptedCard['release_country'];
    delete adaptedCard['watching_date'];
    delete adaptedCard['alternative_title'];
    return adaptedCard;
  }
}
