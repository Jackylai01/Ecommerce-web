import { isArray, isNullOrEmpty, isObject } from './util';

export const fieldQuery = (
  url: string,
  field: { [s: string]: unknown } | ArrayLike<unknown>,
) => {
  let advancedSearchRouter = `${url}?`;
  for (let [keyword, value] of Object.entries(field)) {
    if (isArray(value)) {
      const arrayData: any = value;
      if (arrayData.length === 0) value = '';
    }
    if (value) {
      if (isObject(value)) {
        const objectData: any = value;
        let itemValue = [];
        for (let [keyword, item] of Object.entries(objectData)) {
          itemValue.push(item);
        }
        if (itemValue[0] || itemValue[1]) {
          advancedSearchRouter += `&${keyword}=${itemValue.join(':')}`;
        }
      } else {
        advancedSearchRouter += `&${keyword}=${value}`;
      }
    }
  }
  return advancedSearchRouter;
};

export const formatQueryString = (url: string, ...args: any[]) => {
  if (args.length === 0) {
    return url;
  }
  const [query] = args;
  if (isObject(query)) {
    const params: string[] = [];
    for (const name of Object.keys(query)) {
      if (isNullOrEmpty(query[name])) {
        continue;
      }
      params.push(`${name}=${query[name]}`);
    }
    if (params.length === 0) {
      return url;
    }
    return `${url}?${params.join('&')}`;
  }
  return [url, ...args].join('/');
};
