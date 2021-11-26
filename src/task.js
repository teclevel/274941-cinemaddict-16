// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


const generateTitle = () => {
  const title = [
    'The Dance of Life',
    'Sagebrush Trail',
    'The Man with the Golden Arm',
    'Santa Claus Conquers the Martians',
    'Popeye the Sailor Meets Sindbad the Sailor'
  ];

  const getRandomIndex = getRandomInteger(0, title.length - 1);

  return title[getRandomIndex];
};

const generateRating = () => getRandomInteger(1, 9) / 10 + getRandomInteger(1, 9);

const generateYear = () => getRandomInteger(1920, 1980);

const generateDuration = () => {
  const generateHour = getRandomInteger();
  const generateMinute = getRandomInteger(1, 59);

  if (generateHour === 0){return `${generateMinute}m`}

  return `${generateHour}h ${generateMinute}m`;
}

const generateGenre = () => {
  const genres = ['Musical', 'Western','Cartoon', 'Comedy'];
  return genres[getRandomInteger(0, genres.length-1)]
}

const generateDescription = () => {
  const descriptions = [
    'Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr',
    'Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant',
    'Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…'
  ]
}


export const generateDataCard = {
  title: generateTitle(),
  rating: generateRating(),
  year: generateYear(),
  duration: generateDuration(),
  genre: generateGenre(),
  description: generateDescription()

};



console.log(Object.values(generateDataCard))

// `<article class="film-card">
// <a class="film-card__link">
//   <h3 class="film-card__title">The Dance of Life</h3>
//   <p class="film-card__rating">8.3</p>
//   <p class="film-card__info">
//     <span class="film-card__year">1929</span>
//     <span class="film-card__duration">1h 55m</span>
//     <span class="film-card__genre">Musical</span>
//   </p>
//   <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
//   <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
//   <span class="film-card__comments">5 comments</span>
// </a>
// <div class="film-card__controls">
//   <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
//   <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
//   <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
// </div>
// </article>`
