import {
  ApiPaginationResult,
  ApiResult,
  getRequest,
  postRequest,
} from '@services/shared/api';

import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { Supplier, SupplierResponse } from '@models/responses/supplier';

// 獲取全部進貨訂單
export const apiGetSuppliers = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<SupplierResponse>>(
    formatQueryString('/zigong/erp/supplier', query),
  );

// 創建進貨訂單
export const apiCreateSuppliers = async (data: Supplier) =>
  postRequest<ApiResult<SupplierResponse>>('/zigong/erp/supplier', data);
