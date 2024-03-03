import { formatQueryString } from '../../../helpers/query';
import { AdminUser } from '../../../models/entities/admin-user';
import { PagingQuery } from '../../../models/entities/shared/pagination';
import { validateSchema } from '../../../models/schema/base.schema';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  putRequest,
} from '../../shared/api';
import { ModifyAdminUserSchema } from './admin-admin-users.schema';

/**
 * 後台-取得管理員列表
 * keyword 搜尋欄位：name, email, phoneNumber
 */
export const apiAdminListAdminUsers = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<AdminUser>>(
    formatQueryString('/zigong/admin-users', query),
  );

/**
 * 後台-取得管理員
 * @throws 404 NotFound 查無此管理員
 */
export const apiAdminDetailAdminUser = async (id: string) =>
  getRequest<ApiResult<AdminUser>>(`/zigong/admin-users/${id}`);

/**
 * 後台-編輯管理員
 * @throws 404 NotFound 查無此管理員
 * @throws 400 BadRequest 欄位驗證錯誤
 */
export const apiAdminModifyAdminUser = async (
  adminUser: AdminUser,
  id: string,
) => {
  const { error, value } = validateSchema(ModifyAdminUserSchema(), adminUser);
  if (error) {
    throw error;
  }
  return putRequest<ApiResult<AdminUser>>(`/zigong/admin-users/${id}`, value);
};

/**
 * 後台-刪除管理員
 * @throws 404 NotFound 查無此管理員
 */
export const apiAdminRemoveAdminUser = async (id: string) =>
  deleteRequest(`/zigong/admin-users/${id}`);
