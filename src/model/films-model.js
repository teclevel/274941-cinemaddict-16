import AbstractObservable from '../utils/abstract-observable';

export default class FilmsModel extends AbstractObservable {
  #apiService = null;
  #cards = [];


  constructor(apiService) {
    super();
    this.#apiService = apiService;

    this.#apiService.cards.then((cards) => {
      console.log(cards);
      console.log(cards.map(this.#adaptToClient));
    });
  }

  set cards(cards) {
    this.#cards = [...cards];
  }

  get cards() {
    return this.#cards;
  }

  updateCard = (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      update,
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addCard = (updateType, update) => {
    this.#cards = [
      update,
      ...this.#cards,
    ];

    this._notify(updateType, update);//
  }

  deleteCard = (updateType, update) => {
    const index = this.#cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting card');
    }

    this.#cards = [
      ...this.#cards.slice(0, index),
      ...this.#cards.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient = (card) => {
    const adaptedCard = {
      ...card,
      ...card['film_info'],
      actors: card['film_info']['actors'].join(', '),
      age: card['film_info']['age_rating'],
      genres: card['film_info']['genre'],
      duration: card['film_info']['runtime'],
      rating: card['film_info']['total_rating'],
      writers: card['film_info']['writers'].join(', '),
      ...card['user_details'],


      comments: card['kuyk'],
      isAddedToWatch: card['user_details']['watchlist'],
      isFavorite: card['user_details']['favorite'],
      isWatched: card['user_details']['already_watched'],
      ...card['film_info']['release'],
      dateRelease: card['film_info']['release']['date']
    };

    delete adaptedCard['film_info'];
    delete adaptedCard['genre'];
    delete adaptedCard['runtime'];
    delete adaptedCard['total_rating'];
    delete adaptedCard['age_rating'];
    delete adaptedCard['user_details'];
    delete adaptedCard['release'];
    delete adaptedCard['already_watched'];
    // delete adaptedCard['date'];
    delete adaptedCard['watchlist'];

    return adaptedCard;
  }
}
