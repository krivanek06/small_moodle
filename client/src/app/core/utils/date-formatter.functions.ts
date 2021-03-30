export const getCurrentIOSDate = (): string => {
  const today = new Date();
  //today.setHours(today.getHours() + Math.abs(today.getTimezoneOffset()) / 60);
  return today.toISOString();
};

// return YYYY-MM-DD
export const stFormattedDate = (d: Date) => {
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()]
    .map((n) => (n < 10 ? `0${n}` : `${n}`))
    .join('-');
};

// HH:MM, DD.MM.YYYY
export const stFormatDateWithHours = (date: Date) => {
  const minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  return `${hours}:${minutes}, ${date.getDate()}.${
    date.getMonth() + 1
  }.${date.getFullYear()}`;
};
