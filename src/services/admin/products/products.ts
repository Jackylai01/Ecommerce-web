import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { Product } from '@models/entities/shared/products';
import {
  ApiListResult,
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '../../shared/api';

/**
 * 取得所有產品
 */
export const apiGetAllProducts = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<Product>>(
    formatQueryString('/zigong/products', query),
  );

/**
 * 根據ID取得單一產品
 */
export const apiGetProductById = async (id: string) => {
  return getRequest<ApiResult<any>>(`/zigong/products/${id}`);
};

/**
 * 新增產品
 */
export const apiAddProduct = async (body: FormData) => {
  return postRequest<ApiResult<any>>('/zigong/products', body);
};

/**
 * 更新產品
 * @throws 400 BadRequest 欄位驗證錯誤
 */
export const apiUpdateProduct = async (id: string, body: any) => {
  return putRequest<ApiResult<any>>(`/zigong/products/${id}`, body);
};

/**
 * 刪除產品
 */
export const apiDeleteProduct = async (id: string) => {
  return deleteRequest<ApiResult<any>>(`/zigong/products/${id}`);
};

/**
 * 刪除全部產品
 */
export const apiDeleteAllProducts = async () => {
  return deleteRequest<ApiResult<any>>('/zigong/products/all');
};

/**
 * 更新產品狀態。例:上架、下架
 */
export const apiUpdateProductStatus = async (id: string, status: string) => {
  return putRequest<ApiResult<any>>(`/zigong/products/${id}/status`, {
    status,
  });
};

/**
 * 刪除產品單張相片
 */
export const apiDeleteProductImage = async (
  productId: string,
  imageId: string,
) => {
  const encodedPublicId = encodeURIComponent(imageId);
  return deleteRequest<ApiResult<any>>(
    `/zigong/products/${productId}/image/${encodedPublicId}`,
  );
};

/**
 * 批量上傳產品
 */
export const apiBulkUploadProducts = async (formData: FormData) => {
  return postRequest<ApiListResult<any>>(
    '/zigong/products/bulk-upload',
    formData,
  );
};
