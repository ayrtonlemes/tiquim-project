const DATE_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "America/Manaus",
  hour12: false,
};

const DATETIME_FORMAT: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Manaus",
  hour12: false,
};

export const formatDate = (date: Date): string => {
  const createdAt = new Date(date);

  const datetime: string = createdAt.toLocaleString("pt-BR", DATE_FORMAT);

  return datetime;
};

export const formatDatetime = (date: Date): string => {
  const createdAt = new Date(date);

  const datetime: string = createdAt.toLocaleString("pt-BR", DATETIME_FORMAT);

  return datetime;
};
