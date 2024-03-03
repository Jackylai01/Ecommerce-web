import { ThunkAction } from '@reduxjs/toolkit';
import { makeStore } from '@store';
import { Action } from 'redux';

// 定義 AppStore 類型為 makeStore 函數的返回類型
// store 提供完整的型別信息
export type AppStore = ReturnType<typeof makeStore>;

// 定義 AppState 類型為 AppStore 的 getState 方法的返回類型
export type AppState = ReturnType<AppStore['getState']>;

// 定義 AppDispatch 類型為 AppStore 的 dispatch 方法的類型
// 可以完全地為 Redux dispatch 函數提供型別信息
export type AppDispatch = AppStore['dispatch'];

// 定義 AppThunk 類型以使用 Thunk 中間件來創建非同步的 action
// 定義為 ThunkAction 的一種特定型別，其中：
// ReturnType 為 Thunk action 的返回類型（默認為 void）
// AppState 為應用程式狀態的型別
// unknown 是 Thunk 中間件的額外參數的型別
// Action 是被 dispatch 的 action 的型別
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
