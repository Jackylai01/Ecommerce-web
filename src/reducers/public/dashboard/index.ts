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
  todayRegistrations: number | null;
  totalSales: number | null;
  todayLogins: number | null;
};

const initialState: DashboardState = {
  todayEarnings: null,
  todayRegistrations: null,
  totalSales: null,
  todayLogins: null,
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
      state.todayEarnings = action.payload;
    });
    builder.addCase(getTodayRegistrationsAsync.fulfilled, (state, action) => {
      state.todayRegistrations = action.payload;
    });
    builder.addCase(getTotalSalesAsync.fulfilled, (state, action) => {
      state.totalSales = action.payload;
    });
    builder.addCase(getTodayLoginsAsync.fulfilled, (state, action) => {
      state.todayLogins = action.payload;
    });

    asyncMatcher(builder, ReducerName.PUBLIC_DASHBOARD);
  },
});

export const { resetDashboardState } = dashboardSlice.actions;
export default dashboardSlice.reducer;
