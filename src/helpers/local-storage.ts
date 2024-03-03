import { isBrowser } from './util';

export const getLocalStorage = <T>(key: string): T | null => {
  if (isBrowser()) {
    const item = localStorage.getItem(key);
    if (item && item !== 'undefined') {
      return JSON.parse(item);
    }
  }
  return null;
};

export const setLocalStorage = <T>(key: string, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);
