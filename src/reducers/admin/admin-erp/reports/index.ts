import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import {
  InventoryReport,
  PurchaseOrderReport,
  SalesOrderReport,
} from '@models/responses/report.res';
import { createSlice } from '@reduxjs/toolkit';
import {
  adminERPReportAction,
  getInventoryLevelsReportAsync,
  getPurchaseOrdersReportAsync,
  getSalesOrdersReportAsync,
} from './actions';

type ReportState = ApiState<adminERPReportAction> & {
  inventoryLevels: InventoryReport[] | null;
  purchaseOrders: PurchaseOrderReport[] | null;
  salesOrders: SalesOrderReport[] | null;
};

const initialState: ReportState = {
  inventoryLevels: null,
  purchaseOrders: null,
  salesOrders: null,
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
      getInventoryLevelsReportAsync.fulfilled,
      (state, action) => {
        state.inventoryLevels = action.payload;
      },
    );
    builder.addCase(getPurchaseOrdersReportAsync.fulfilled, (state, action) => {
      state.purchaseOrders = action.payload;
    });
    builder.addCase(getSalesOrdersReportAsync.fulfilled, (state, action) => {
      state.salesOrders = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_ERP_REPORT);
  },
});

export const { resetReportState } = reportSlice.actions;
export default reportSlice.reducer;
