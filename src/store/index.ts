import { configureStore } from '@reduxjs/toolkit';
// Redux 綁定到 Next.js 應用程式的工具
import { AppStore } from '@models/store';
import { createWrapper } from 'next-redux-wrapper';
import appReducer from '../reducers';
import interceptAxiosErrorsMiddleware from './middleware/axios';

// 定義一個 makeStore 函數，它將為我們的應用程式創建一個新的 Redux store
const makeStore = () =>
  configureStore({
    reducer: appReducer,
    // middleware 目前設定只要發生action 產生rejected 就會執行登出的機制
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([interceptAxiosErrorsMiddleware]);
    },
    // 在開發模式中啟用 Redux devtools，方便我們調試 Redux 狀態
    devTools: process.env.NODE_ENV !== 'production',
  });

// 使用 next-redux-wrapper 的 createWrapper 函數創建一個新的組件。
// 這個組件將 Redux store 包裝在我們的應用程式中
const wrapper = createWrapper<AppStore>(makeStore);

export default wrapper;

export { makeStore };
