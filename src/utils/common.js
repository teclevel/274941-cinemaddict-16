// // Функция из интернета по генерации случайного числа из диапазона
// // Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

// export const getRandomInteger = (a = 0, b = 1) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));

//   return Math.floor(lower + Math.random() * (upper - lower + 1));
// };

// // Из простого текста сделать массив предложений  https://efim360.ru/javascript-tekst-v-massiv-predlozhenij/
// const getArraySentences = (text) => text.split('. ').map((el) => el.replace(/\.*$/, '.'));

// const getRandomElementArray = (array) => {
//   const randomIndex = getRandomInteger(0, array.length - 1);
//   return array[randomIndex];
// };

// const getRandomText = (array, number) => {
//   let text = '';

//   for (let i = 0; i < getRandomInteger(1, number); i++) {
//     const sentence = getRandomElementArray(array);
//     text += `${sentence} `;
//   }
//   return text;
// };

// // функция перемешивания массива с использованием источника https://learn.javascript.ru/task/shuffle
// const getShuffleArray = (array) => {
//   const newArray = array.slice();

//   for (let i = newArray.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
//   }
//   return newArray;
// };

// export { getArraySentences, getRandomElementArray, getRandomText, getShuffleArray };
