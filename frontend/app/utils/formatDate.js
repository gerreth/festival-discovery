import * as luxon from 'luxon';

const getMonth = date => {
  return luxon.DateTime.local(
    parseInt(date[0]),
    parseInt(date[1]),
    parseInt(date[2]),
  ).monthLong;
};

export const withYear = raw => {
  const date = raw.split('-');
  return `${date[2]}. ${getMonth(date)} ${date[0]}`;
};

export const withoutYear = raw => {
  const date = raw.split('-');
  return `${date[2]}. ${getMonth(date)}`;
};

export const full = (start, end) => {
  if (start === end) return withYear(start);

  return `${withoutYear(start)} - ${withYear(end)}`;
};

export default {
  full,
  withYear,
  withoutYear,
};
