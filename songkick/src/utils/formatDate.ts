import * as luxon from "luxon";

const getMonth = (date: any) => {
  return luxon.DateTime.local(
    parseInt(date[0]),
    parseInt(date[1]),
    parseInt(date[2])
  ).monthLong;
};

const withYear = (raw: any) => {
  const date = raw.split("-");
  return `${date[2]}. ${getMonth(date)} ${date[0]}`;
};

const withoutYear = (raw: any) => {
  const date = raw.split("-");
  return `${date[2]}. ${getMonth(date)}`;
};

const full = (start: any, end: any) => {
  if (start === end) return withYear(start);

  return `${withoutYear(start)} - ${withYear(end)}`;
};

export default full;
