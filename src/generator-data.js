import { getRandomInteger, getArraySentences, getRandomElementArray, getRandomText, getShuffleArray } from './utility';
import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(RelativeTime);

const NAMES = ['Tim Makoveev', 'Jon Doe', 'Alex Smith', 'Antony Mann', 'Anne Wington', 'Heinz Herald', 'Richard Weil'];
const GENRES = ['Musical', 'Western', 'Cartoon', 'Comedy'];
const MAX_NUMBER_SENTENCE = 5;
const MAX_NUMBER_NAME = 3;
const MAX_NUMBER_GENRES = 4;

const getNames = () => getShuffleArray(NAMES).slice(0, getRandomInteger(1, MAX_NUMBER_NAME)).join(', ');

const getGenres = ()=> getShuffleArray(GENRES).slice(0, getRandomInteger(1, MAX_NUMBER_GENRES));

const generateTitle = () => getRandomElementArray([
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor'
]);

const generateRating = () => getRandomInteger(1, 9) / 10 + getRandomInteger(4, 8);

const generateYear = () => getRandomInteger(1920, 1980);

const generateArraySentence = () => getArraySentences('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.');

const generateDescriptionFilm = () => getRandomText(generateArraySentence(), MAX_NUMBER_SENTENCE);

const generateCommentText = () => getRandomElementArray(generateArraySentence());

const generatePoster = () => getRandomElementArray([
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
]);

const generateEmoji = () => getRandomElementArray([
  './images/emoji/angry.png',
  './images/emoji/puke.png',
  './images/emoji/sleeping.png',
  './images/emoji/smile.png'
]);

const generateDate = () => {
  const daysGap = getRandomInteger(30, 30000);
  return dayjs().subtract(daysGap, 'day').format('D MMMM YYYY');
};

const generateDateComment = () => {
  const daysGap = getRandomInteger(0, 1000);
  const minutesGap = getRandomInteger(0, 1440);
  const dayComment = dayjs().subtract(daysGap, 'day')
    .subtract(minutesGap, 'minute');

  return dayComment.format('YYYY/MM/D hh:mm');
};

export const generateDataCard = () => ({
  title: generateTitle(),
  rating: generateRating(),
  year: generateYear(),
  duration: getRandomInteger(10, 150),
  genres: getGenres(),
  age: getRandomInteger(6, 18),
  description: generateDescriptionFilm(),
  poster: generatePoster(),
  director: getRandomElementArray(NAMES),
  writers: getNames(),
  actors: getNames(),
  dateRelease: generateDate(),
  isAddedToWatch: Boolean(getRandomInteger(0, 1)),
  isWatched: Boolean(getRandomInteger(0, 1)),
  isFavorite: Boolean(getRandomInteger(0, 1)),
});

export const generateComment = () => ({
  emotion: generateEmoji(),
  commentText: generateCommentText(),
  name: getRandomElementArray(NAMES),
  date: generateDateComment(),
});
