import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  DashboardAsyncAction,
  getTodayEarningsAsync,
  getTodayLoginsAsync,
  getTodayRegistrationsAsync,
  getTotalSalesAsync,
} from './actions';

type DashboardState = ApiState<DashboardAsyncAction> & {
  todayEarnings: number | null;
  yesterdayEarnings: number | null;
  todayRegistrations: number | null;
  yesterdayRegistrations: number | null;
  totalSales: number | null;
  yesterdaySales: number | null;
  todayLogins: number | null;
  yesterdayLogins: number | null;
};

const initialState: DashboardState = {
  todayEarnings: null,
  yesterdayEarnings: null,
  todayRegistrations: null,
  yesterdayRegistrations: null,
  totalSales: null,
  yesterdaySales: null,
  todayLogins: null,
  yesterdayLogins: null,
  ...newApiState<DashboardState>(DashboardAsyncAction),
};

const dashboardSlice = createSlice({
  name: ReducerName.PUBLIC_DASHBOARD,
  initialState,
  reducers: {
    resetDashboardState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getTodayEarningsAsync.fulfilled, (state, action) => {
      state.todayEarnings = action.payload.todayEarnings;
      state.yesterdayEarnings = action.payload.yesterdayEarnings;
    });
    builder.addCase(getTodayRegistrationsAsync.fulfilled, (state, action) => {
      state.todayRegistrations = action.payload.todayRegistrations;
      state.yesterdayRegistrations = action.payload.yesterdayRegistrations;
    });
    builder.addCase(getTotalSalesAsync.fulfilled, (state, action) => {
      state.totalSales = action.payload.totalSalesAmountToday;
      state.yesterdaySales = action.payload.totalSalesAmountYesterday;
    });
    builder.addCase(getTodayLoginsAsync.fulfilled, (state, action) => {
      state.todayLogins = action.payload.todayLoginsCount;
      state.yesterdayLogins = action.payload.yesterdayLoginsCount;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_DASHBOARD);
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
