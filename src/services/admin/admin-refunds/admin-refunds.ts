import { formatQueryString } from '@helpers/query';

import { PagingQuery } from '@models/entities/shared/pagination';
import { refundsResponse } from '@models/responses/refunds';
import {
  ApiPaginationResult,
  ApiResult,
  getRequest,
  postRequest,
} from '../../shared/api';

/** 獲取所有待審核的退貨申請 */
export const apiGetPendingRefundRequests = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<refundsResponse>>(
    formatQueryString('/refunds/pending-requests', query),
  );

/** 商家批准退貨請求 */
export const apiAdminApproveReturnRequest = async (refundId: string) => {
  return postRequest<ApiResult<refundsResponse>>(
    '/refunds/approve-return',
    refundId,
  );
};

/** 商家拒絕退貨請求 */

export const apiAdminRejectReturnRequest = async (
  refundId: string,
  emailSubject: string,
  emailBody: string,
) => {
  return postRequest<ApiResult<refundsResponse>>('/refunds/reject-return', {
    refundId,
    emailSubject,
    emailBody,
  });
};

/** 搜索退貨申請 */

export const apiAdminSearchPendingRefund = async (searchTerm: string) => {
  return getRequest<ApiResult<refundsResponse>>(
    `/refunds/search/${searchTerm}`,
  );
};

/** 封存退貨申請訂單 */

export const apiArchiveReturnRequest = async (refundId: string) => {
  return postRequest<ApiResult<refundsResponse>>('/refunds/archive', {
    refundId,
  });
};
