export const unixToDate = (unixTime) => {
  const milliseconds = unixTime * 1000;
  const date = new Date(milliseconds);

  return date;
};

export const getWeekDay = (unixTime) => {
  const date = unixToDate(unixTime);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = date.getDay();

  return daysOfWeek[dayOfWeek];
};

export const getHours = (unixTime) => {
  const date = unixToDate(unixTime);
  const hours = date.getHours();

  return hours;
}