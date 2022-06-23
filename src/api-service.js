const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get cards() {
    return this.#load({ url: 'movies' })
      .then(ApiService.parseResponse);
  }

  get comments() {
    return async (id) => this.#load({ url: `comments/${id}` })
      .then(ApiService.parseResponse);
  }

  // getComments = async (id) => this.#load({ url: `comments/${id}` })
  //   .then(ApiService.parseResponse)

  addComment = async (data) => {
    const response = await this.#load({
      url: `comments/${data.id}`,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServerUserComment(data)),


      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parseResponse = await ApiService.parseResponse(response);

    return parseResponse;
  }

  deleteComment = async (comment) => {
    const response = await this.#load({
      url: `comments/${comment.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      { method, body, headers },
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  updateCard = async (card) => {
    const response = await this.#load({
      url: `movies/${card.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(card)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServerUserComment = (card) => {
    const adaptedComment = {

      comment: card.newComment,
      emotion: card.isUserEmoji,

    };
    return adaptedComment;
  }

  #adaptToServer = (card) => {
    const adaptedCard = {
      ...card,
      'user_details': {
        'watchlist': card.isAddedToWatch,
        'favorite': card.isFavorite,
        'already_watched': card.isWatched,
        'watching_date': card.watchingDate.toISOString(),
      },
      'film_info': {
        'actors': card.actors.split(', '),
        'age_rating': card.age,
        'alternative_title': card.alternativeTitle,
        'director': card.director,
        'description': card.description,
        'genre': card.genres,
        'poster': card.poster,
        'release': {
          'date': card.date,
          'release_country': card.releaseCountry,
        },
        'runtime': card.duration,
        'title': card.title,
        'total_rating': card.rating,
        'writers': card.writers.split(', '),
      },
      'comments': card['comments'].map((comment) => comment.id ? comment.id : comment),
    };

    delete adaptedCard['genres'];
    delete adaptedCard['duration'];
    delete adaptedCard['rating'];
    delete adaptedCard['age'];
    delete adaptedCard['release'];
    delete adaptedCard['isWatched'];
    delete adaptedCard['isFavorite'];
    delete adaptedCard['isAddedToWatch'];
    delete adaptedCard['releaseCountry'];
    delete adaptedCard['writers'];
    delete adaptedCard['watchingDate'];
    delete adaptedCard['title'];
    delete adaptedCard['poster'];
    delete adaptedCard['director'];
    delete adaptedCard['description'];
    delete adaptedCard['dateRelease'];
    delete adaptedCard['date'];
    delete adaptedCard['alternativeTitle'];
    delete adaptedCard['actors'];

    return adaptedCard;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
