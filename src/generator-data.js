import { getRandomInteger, getArraySentences, getRandomElementArray, getRandomText } from './utility';

const NAME = ['Tim Makoveev', 'Jon Doe', 'Alex Smith', 'Antony Mann', 'Anne Wington'];
const MAX_NUMBER_SENTENCE = 5;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateTitle = () => getRandomElementArray([
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor'
]);

const generateRating = () => getRandomInteger(1, 9) / 10 + getRandomInteger(1, 9);

const generateYear = () => getRandomInteger(1920, 1980);

const generateDuration = () => {
  const generateHour = getRandomInteger();
  const generateMinute = getRandomInteger(1, 59);

  if (generateHour === 0) {
    return `${generateMinute}m`;
  }

  return `${generateHour}h ${generateMinute}m`;
};

const generateGenre = () => getRandomElementArray(['Musical', 'Western', 'Cartoon', 'Comedy']);

const generateArraySentence = () => getArraySentences('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.');

const generateDescriptionFilm = () => getRandomText(generateArraySentence(), MAX_NUMBER_SENTENCE);

const generateCommentText = () => getRandomElementArray(generateArraySentence());

const generatePoster = () => getRandomElementArray([
  'public/images/posters/made-for-each-other.png',
  'public/images/posters/popeye-meets-sinbad.png',
  'public/images/posters/sagebrush-trail.jpg',
  'public/images/posters/santa-claus-conquers-the-martians.png',
  'public/images/posters/the-dance-of-life.png',
]);

const generateEmoji = () => getRandomElementArray([
  'public/images/emoji/angry.png',
  'public/images/emoji/puke.png',
  'public/images/emoji/sleeping/png',
  'public/images/emoji/smile.png'
]);

const generateNameUser = () => getRandomElementArray(NAME);

export const generateDataCard = () => ({
  title: generateTitle(),
  rating: generateRating(),
  year: generateYear(),
  duration: generateDuration(),
  genre: generateGenre(),
  description: generateDescriptionFilm(),
  poster: generatePoster(),
  isAddedToWatch: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});

export const generateComment = () => ({
  emoji: generateEmoji(),
  comment: generateCommentText(),
  name: generateNameUser(),
  date: '2021/11/27 23:30',
});
