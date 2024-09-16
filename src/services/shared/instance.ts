import { ADMIN_API_ROUTE } from '@fixtures/constants';
import {
  loadAdminToken,
  loadClientToken,
  removeAdminToken,
  removeClientToken,
  saveAdminToken,
  saveClientToken,
} from '@helpers/token';
import axios from 'axios';

export const BASE_API_URL = 'https://ecommerce-api2023.onrender.com/api';
export const TEST_API_URL = 'http://localhost:3001/api';
export const ACCESS_TOKEN_NAME = 'atn';

const instance = axios.create({
  baseURL: BASE_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const formInstance = axios.create({
  baseURL: BASE_API_URL,
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
    };
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 根據是否包含 ADMIN_API_ROUTE 來判斷使用哪個 refresh token 路徑
        const isAdmin = originalRequest.url?.includes(ADMIN_API_ROUTE);
        const refreshTokenUrl = isAdmin
          ? `${BASE_API_URL}/zigong/refreshToken`
          : `${BASE_API_URL}/client/refreshToken`;

        const response = await axios.post(
          refreshTokenUrl,
          {},
          { withCredentials: true },
        );

        const newToken = response.data.accessToken;

        if (newToken) {
          // 根據角色保存新的 token
          const tokenData = isAdmin ? loadAdminToken() : loadClientToken();
          if (tokenData) {
            isAdmin
              ? saveAdminToken({ ...tokenData, accessToken: newToken })
              : saveClientToken({ ...tokenData, accessToken: newToken });
          }

          // 更新原始請求中的 Authorization 標頭
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          // 重試原始請求
          return instance(originalRequest);
        }
      } catch (refreshError) {
        removeAdminToken();
        removeClientToken();
      }
    }

    console.error('Response error:', error);
    return Promise.reject(error);
  },
);

export default instance;
