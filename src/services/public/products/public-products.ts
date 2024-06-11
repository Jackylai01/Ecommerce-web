import { ProductsResponse } from '@models/responses/products.res';
import { formatQueryString } from '../../../helpers/query';
import { PagingQuery } from '../../../models/entities/shared/pagination';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 前台-取得產品列表
 * keyword 搜尋欄位：name, email, phoneNumber
 */
export const apiPublicProductsList = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ProductsResponse>>(
    formatQueryString('/public/products', query),
  );

/**
 * 前台-取得單一產品的內容
 * @throws 404 NotFound 查無此管理員
 */
export const apiPublicProductsDetail = async (id: string) =>
  getRequest<ApiResult<ProductsResponse>>(`/public/products/${id}`);
