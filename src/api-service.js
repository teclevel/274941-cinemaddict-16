const Method = {
  GET: 'GET',
  PUT: 'PUT',
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

  // get comments() {
  //   return async (id) => this.#load({ url: `comments/${id}` })
  //     .then(ApiService.parseResponse);
  // }

  getComments = async (id) => this.#load({ url: `comments/${id}` })
    .then(ApiService.parseResponse)

  // addComment = async (data) => {
  //   const response = await this.#load({
  //     url: `comments/${data.id}`,
  //     method: Method.POST,
  //     body: JSON.stringify(data.comment),
  //     headers: new Headers({ 'Content-Type': 'application/json' }),
  //   });

  //   return await ApiService.parseResponse(response);
  // }

  // deleteComment = async (data) => await this.#load({
  //   url: `comments/${data.commentId}`,
  //   method: Method.DELETE,
  // })

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

  #adaptToServer = (task) => {
    // const adaptedTask = {...task,
    //   'due_date': task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
    //   'is_archived': task.isArchive,
    //   'is_favorite': task.isFavorite,
    //   'repeating_days': task.repeating,
    // };

    // // Ненужные ключи мы удаляем
    // delete adaptedTask.dueDate;
    // delete adaptedTask.isArchive;
    // delete adaptedTask.isFavorite;
    // delete adaptedTask.repeating;

    // return adaptedTask;
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
