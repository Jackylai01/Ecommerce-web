import {
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
} from '../../shared/api'; // 根据实际路径调整导入路径

/**
 * 取得所有產品
 */
export const apiGetAllProducts = async (params: any) => {
  return getRequest<ApiResult<any>>('/products', params);
};

/**
 * 根據ID取得單一產品
 */
export const apiGetProductById = async (id: string) => {
  return getRequest<ApiResult<any>>(`/products/${id}`);
};

/**
 * 新增產品
 */
export const apiAddProduct = async (body: any) => {
  return postRequest<ApiResult<any>>('/products', body);
};

/**
 * 更新產品
 * @throws 400 BadRequest 欄位驗證錯誤
 */
export const apiUpdateProduct = async (id: string, body: any) => {
  return postRequest<ApiResult<any>>(`/products/${id}`, body);
};

/**
 * 刪除產品
 */
export const apiDeleteProduct = async (id: string) => {
  return deleteRequest<ApiResult<any>>(`/products/${id}`);
};

/**
 * 刪除全部產品
 */
export const apiDeleteAllProducts = async () => {
  return deleteRequest<ApiResult<any>>('/products/all');
};
