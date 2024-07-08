import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAdminApproveReturnRequest,
  apiAdminRejectReturnRequest,
  apiArchiveReturnRequest,
  apiGetPendingRefundRequests,
} from '@services/admin/admin-refunds/admin-refunds';

export enum adminRefundAction {
  getPendingRefundRequests = 'getPendingRefundRequests',
  approveReturnRequest = 'approveReturnRequest',
  rejectReturnRequest = 'rejectReturnRequest',
  getSearchTerm = 'getSearchTerm',
  archiveReturn = 'archiveReturn',
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
  async ({
    refundId,
    emailSubject,
    emailBody,
  }: {
    refundId: string;
    emailSubject: string;
    emailBody: string;
  }) => {
    const response = await apiAdminRejectReturnRequest(
      refundId,
      emailSubject,
      emailBody,
    );
    return response.result.data;
  },
);

export const archiveReturnRequestAsync = createAsyncThunk(
  `${ReducerName.ADMIN_REQUESTRETURN}/${adminRefundAction.archiveReturn}`,
  async (refundId: string) => {
    const response = await apiArchiveReturnRequest(refundId);
    return response.result.data;
  },
);
