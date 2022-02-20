import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(RelativeTime);


export const formatDateComment = (date) => {
  if (dayjs().diff(date, 'hour') < 24) {
    return 'Today';
  } else if (dayjs().diff(date, 'hour') < 48) {
    return dayjs(date).format('YYYY/MM/D hh:mm');
  }

  return dayjs(date).fromNow();
};

// export const getTimeFromMins = (mins) => {
//   const hours = Math.trunc(mins / 60);
//   const minutes = mins % 60;
//   if (!hours) {
//     return `${minutes}m`;
//   }
//   return `${hours}h ${minutes}m`;
// };

export const convertDateInYear = (date) => dayjs(date).format('YYYY');
