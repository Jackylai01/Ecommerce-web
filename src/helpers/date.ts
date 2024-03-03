export const week = ['日', '一', '二', '三', '四', '五', '六'];

export const onlyDate = (date: Date | string) => {
  return new Date(date).toISOString().substring(0, 10);
};

export const onlyTime = (date: Date | string) => {
  return new Date(date).toLocaleTimeString(undefined, {
    timeStyle: 'short',
    hour12: false,
  });
};

export const fillUpDate = (value: string | number) => {
  return Number(value) >= 10 ? value : `0${value}`;
};

export const dateTime = (
  value?: Date | string,
  options?: Intl.DateTimeFormatOptions & { customType?: 'short' },
) => {
  if (!value) return '';

  if (options?.customType === 'short') {
    options = { dateStyle: 'short', timeStyle: 'short', hour12: false };
  }

  return new Date(value).toLocaleString(undefined, options);
};

export const dateRange = (start: Date | string, end: Date | string) => {
  const startDate = new Date(start).toLocaleDateString();
  const endDate = new Date(end).toLocaleDateString();
  return `${startDate} ~ ${endDate}`;
};

export const defaultDate = (value: Date | string) => {
  return new Date(value)
    .toLocaleDateString()
    .split('/')
    .map((number) => fillUpDate(number))
    .join('-');
};

export const defaultDateTime = (
  value: Date | string,
  type: 'normal' | 'start' | 'end' = 'normal',
) => {
  let time = onlyTime(value);
  if (type === 'start') time = '00:00';
  if (type === 'end') time = '23:59';
  return `${onlyDate(value)}T${time}`;
};

export const betweenHours = (start: Date | string, end: Date | string) => {
  const between = new Date(end).getTime() - new Date(start).getTime();
  const millisecondsPerHour = 60 * 60 * 1000;
  return (between / millisecondsPerHour).toLocaleString(undefined, {
    maximumFractionDigits: 2,
  });
};
