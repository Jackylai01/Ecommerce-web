import { ADMIN_API_ROUTE } from '@fixtures/constants';
import {
  loadAdminToken,
  loadClientToken,
  removeAdminToken,
  saveAdminToken,
} from '@helpers/token';
import axios from 'axios';

export const BASE_API_URL = 'https://ecommerce-api2023.onrender.com/api';
export const TEST_API_URL = 'http://localhost:3001/api';
export const ACCESS_TOKEN_NAME = 'atn';

const instance = axios.create({
  baseURL: TEST_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const formInstance = axios.create({
  baseURL: TEST_API_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const isAdmin = config.url?.includes(ADMIN_API_ROUTE);
    const token = isAdmin ? loadAdminToken() : loadClientToken();

    if (token) {
      config.headers!.Authorization = `Bearer ${token.accessToken}`;
      config.headers!['Session-Token'] = token.currentSessionToken;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

formInstance.interceptors.response.use(
  (response) => {
    return {
      res: response,
      status: response.status,
      result: response.data,
    } as any;
  },
  async (error) => {
    if (!error.isAxiosError) {
      return Promise.reject(error);
    }

    return Promise.reject(
      error.response?.data?.message || error.response?.status,
    );
  },
);

instance.interceptors.response.use(
  (response) => {
    return {
      res: response,
      status: response.status,
      result: response.data,
    } as any;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 使用 axios.post 來刷新 token
        const response = await axios.post(
          `${BASE_API_URL}/zigong/refreshToken`,
          {},
          { withCredentials: true },
        );

        const newToken = response.data.accessToken;

        if (newToken) {
          // 保存新的 token
          const tokenData = loadAdminToken();
          if (tokenData) {
            saveAdminToken({ ...tokenData, accessToken: newToken });
          }

          // 更新原始請求中的 Authorization 標頭
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          // 重試原始請求
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // 清除本地的 adminToken
        removeAdminToken();

        // 確保 refreshError 的類型已知
        if (
          axios.isAxiosError(refreshError) &&
          (refreshError.response?.status === 403 ||
            refreshError.response?.status === 401)
        ) {
          window.location.href = '/zigong/auth/login';
        }
      }
    }

    console.error('Response error:', error);
    return Promise.reject(error);
  },
);

export default instance;
