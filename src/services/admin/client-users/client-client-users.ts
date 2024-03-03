import { ClientUser } from '@models/entities/client-user';
import { formatQueryString } from '../../../helpers/query';
import { PagingQuery } from '../../../models/entities/shared/pagination';
import { validateSchema } from '../../../models/schema/base.schema';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  putRequest,
} from '../../shared/api';
import { ModifyClientUserSchema } from './client-client-users.schema';

/**
 * 後台-取得會員列表
 * keyword 搜尋欄位：name, email, phoneNumber
 */
export const apiClientListClientUsers = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<ClientUser>>(
    formatQueryString('/zigong/client-users', query),
  );

/**
 * 後台-取得單一會員
 * @throws 404 NotFound 查無此會員
 */
export const apiClientDetailAdminUser = async (id: string) =>
  getRequest<ApiResult<ClientUser>>(`/zigong/client-users/${id}`);

/**
 * 後台-編輯會員資料
 * @throws 404 NotFound 查無此會員
 * @throws 400 BadRequest 欄位驗證錯誤
 */
export const apiClientModifyAdminUser = async (clientUser: ClientUser) => {
  const { error, value } = validateSchema(ModifyClientUserSchema(), clientUser);
  if (error) {
    throw error;
  }
  return putRequest<ApiResult<ClientUser>>('/zigong/client-users', value);
};

/**
 * 後台-刪除會員
 * @throws 404 NotFound 查無此會員
 */
export const apiClientRemoveAdminUser = async (id: string) =>
  deleteRequest(`/zigong/client-users/${id}`);
