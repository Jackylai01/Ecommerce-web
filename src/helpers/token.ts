import { LocalStorageKey } from '@enums/local-storage-key';
import { AuthResponse } from '@models/responses/user.res';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from './local-storage';
import { isNullOrEmpty } from './util';

// client
export const isClientLoggedIn = () => {
  const token = loadClientToken();
  const isLoggedIn = !isNullOrEmpty(token);
  return isLoggedIn;
};

export const loadClientToken = () => {
  return getLocalStorage<AuthResponse>(
    LocalStorageKey.CLIENT_ACCESS_TOKEN_NAME,
  );
};

export const saveClientToken = (response: AuthResponse) => {
  setLocalStorage<AuthResponse>(
    LocalStorageKey.CLIENT_ACCESS_TOKEN_NAME,
    response,
  );
};

export const removeClientToken = () => {
  removeLocalStorage(LocalStorageKey.CLIENT_ACCESS_TOKEN_NAME);
};

// admin
export const isAdminLoggedIn = () => {
  const token = loadAdminToken();
  const isLoggedIn = !isNullOrEmpty(token);
  return isLoggedIn;
};

// 上一個token
export const loadAdminToken = () => {
  return getLocalStorage<AuthResponse>(LocalStorageKey.ADMIN_ACCESS_TOKEN_NAME);
};

export const saveAdminToken = (response: AuthResponse) => {
  setLocalStorage<AuthResponse>(
    LocalStorageKey.ADMIN_ACCESS_TOKEN_NAME,
    response,
  );
};

export const removeAdminToken = () => {
  removeLocalStorage(LocalStorageKey.ADMIN_ACCESS_TOKEN_NAME);
};
