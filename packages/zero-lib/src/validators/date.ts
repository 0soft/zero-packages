import dayjs from 'dayjs';
export const validateDate = (value: any) => {
  // TODO: support other formats
  try {
    return /^\d{4}-\d{2}-\d{2}$/.test(value) && dayjs(value, 'YYYY-MM-DD').isValid();
  } catch (e) {
    return false;
  }
};
