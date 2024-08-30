import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import {
  AdminStatisticsAction,
  getActiveUsersStatisticsAsync,
  getOrderDetailsAsync,
  getOrdersOverviewAsync,
  getSalesOverviewAsync,
  getUserStatisticsAsync,
} from './actions';

type AdminStatisticsState = ApiState<AdminStatisticsAction> & {
  activeUsersStatistics: any | null;
  salesOverview: any | null;
  orderDetails: any | null;
  userStatistics: any | null;
  ordersOverview: any | null;
};

const initialState: AdminStatisticsState = {
  activeUsersStatistics: null,
  salesOverview: null,
  orderDetails: null,
  userStatistics: null,
  ordersOverview: null,
  ...newApiState<AdminStatisticsState>(AdminStatisticsAction),
};

const adminStatisticsSlice = createSlice({
  name: ReducerName.ADMIN_STATISTICS,
  initialState,
  reducers: {
    resetStatisticsState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getActiveUsersStatisticsAsync.fulfilled,
      (state, action) => {
        state.activeUsersStatistics = action.payload;
      },
    );
    builder.addCase(getSalesOverviewAsync.fulfilled, (state, action) => {
      state.salesOverview = action.payload;
    });
    builder.addCase(getOrderDetailsAsync.fulfilled, (state, action) => {
      state.orderDetails = action.payload;
    });
    builder.addCase(getUserStatisticsAsync.fulfilled, (state, action) => {
      state.userStatistics = action.payload;
    });
    builder.addCase(getOrdersOverviewAsync.fulfilled, (state, action) => {
      state.ordersOverview = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_STATISTICS);
  },
});

export const { resetStatisticsState } = adminStatisticsSlice.actions;

export default adminStatisticsSlice.reducer;
