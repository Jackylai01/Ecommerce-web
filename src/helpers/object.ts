export const dotKeysValue = (value: { [key: string]: any }, key: string) => {
  const keys = key.split('.');
  for (const key of keys) {
    if (!value[key]) return undefined;
    value = value[key];
  }
  return value;
};
