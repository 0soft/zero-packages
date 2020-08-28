import dayjs from 'dayjs';

export const formatDate = (value: number | string, format = 'DD/MM/YYYY HH:mm'): string | null => {
  if (!value) {
    return null;
  }

  return dayjs(value).format(format);
};
