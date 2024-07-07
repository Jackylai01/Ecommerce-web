import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAdminApproveReturnRequest,
  apiAdminRejectReturnRequest,
  apiAdminSearchPendingRefund,
  apiGetPendingRefundRequests,
} from '@services/admin/admin-refunds/admin-refunds';

export enum adminRefundAction {
  getPendingRefundRequests = 'getPendingRefundRequests',
  approveReturnRequest = 'approveReturnRequest',
  rejectReturnRequest = 'rejectReturnRequest',
  getSearchTerm = 'getSearchTerm',
}

export const getPendingRefundRequestsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_REQUESTRETURN}/${adminRefundAction.getPendingRefundRequests}`,
  async (query: PagingQuery) => {
    const response = await apiGetPendingRefundRequests(query);
    return response.result;
  },
);

export const approveReturnRequestAsync = createAsyncThunk(
  `${ReducerName.ADMIN_REQUESTRETURN}/${adminRefundAction.approveReturnRequest}`,
  async (refundId: string) => {
    const response = await apiAdminApproveReturnRequest(refundId);
    return response.result.data;
  },
);

export const rejectReturnRequestAsync = createAsyncThunk(
  `${ReducerName.ADMIN_REQUESTRETURN}/${adminRefundAction.rejectReturnRequest}`,
  async (refundId: string) => {
    const response = await apiAdminRejectReturnRequest(refundId);
    return response.result.data;
  },
);

export const searchPendingRefundAsync = createAsyncThunk(
  `${ReducerName.ADMIN_REQUESTRETURN}/${adminRefundAction.getSearchTerm}`,
  async (searchTerm: string) => {
    const response = await apiAdminSearchPendingRefund(searchTerm);
    console.log(response);
    return response.result;
  },
);
