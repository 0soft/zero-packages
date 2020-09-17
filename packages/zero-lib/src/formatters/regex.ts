export const formatRegex = (
  value: any,
  reg: ((val: any) => RegExp) | RegExp,
  replace: ((val: any) => string) | string
) => {
  if (value == null) {
    return null;
  }
  value = typeof value === 'number' ? value.toString() : value;
  if (typeof value === 'string') {
    return value.replace(
      typeof reg === 'function' ? reg(value) : reg,
      typeof replace === 'function' ? replace(value) : replace
    );
  }
  return null;
};
