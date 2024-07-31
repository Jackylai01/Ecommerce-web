import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import {
  InventoryReport,
  IStockMovement,
  SalesOrderReport,
} from '@models/responses/report.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  adminERPReportAction,
  getInventoryAlertsReportAsync,
  getInventoryDetailsReportAsync,
  getInventoryForecastReportAsync,
  getInventoryMovementsReportAsync,
  getInventoryOverviewReportAsync,
  getInventoryTrendsReportAsync,
} from './actions';

type ReportState = ApiState<adminERPReportAction> & {
  inventoryOverview: InventoryReport | null;
  inventoryMovements: IStockMovement[] | null;
  inventoryForecast: SalesOrderReport[] | null;
  inventoryAlerts: SalesOrderReport[] | null;
  inventoryDetails: SalesOrderReport[] | null;
  inventoryTrends: SalesOrderReport[] | null;
};

const initialState: ReportState = {
  inventoryOverview: null,
  inventoryMovements: null,
  inventoryForecast: null,
  inventoryAlerts: null,
  inventoryDetails: null,
  inventoryTrends: null,
  ...newApiState<ReportState>(adminERPReportAction),
};

const reportSlice = createSlice({
  name: ReducerName.ADMIN_ERP_REPORT,
  initialState,
  reducers: {
    resetReportState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      getInventoryOverviewReportAsync.fulfilled,
      (state, action) => {
        state.inventoryOverview = action.payload;
      },
    );
    builder.addCase(
      getInventoryMovementsReportAsync.fulfilled,
      (state, action) => {
        state.inventoryMovements = action.payload;
      },
    );
    builder.addCase(
      getInventoryForecastReportAsync.fulfilled,
      (state, action) => {
        state.inventoryForecast = action.payload;
      },
    );
    builder.addCase(
      getInventoryAlertsReportAsync.fulfilled,
      (state, action) => {
        state.inventoryAlerts = action.payload;
      },
    );
    builder.addCase(
      getInventoryDetailsReportAsync.fulfilled,
      (state, action) => {
        state.inventoryDetails = action.payload;
      },
    );
    builder.addCase(
      getInventoryTrendsReportAsync.fulfilled,
      (state, action) => {
        state.inventoryTrends = action.payload;
      },
    );

    asyncMatcher(builder, ReducerName.ADMIN_ERP_REPORT);
  },
});

export const { resetReportState } = reportSlice.actions;
export default reportSlice.reducer;
