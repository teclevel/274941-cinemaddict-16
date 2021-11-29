export const createStatisticTemplate = (cards) => {
  const counter = cards.length;

  return (`<section class="footer__statistics">${counter}</section>`);
};
