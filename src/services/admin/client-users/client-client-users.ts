import { ClientUser } from '@models/entities/client-user';
import { formatQueryString } from '../../../helpers/query';
import { PagingQuery } from '../../../models/entities/shared/pagination';
import {
  ApiPaginationResult,
  ApiResult,
  deleteRequest,
  getRequest,
  postRequest,
} from '../../shared/api';

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
 * 後台-刪除會員
 * @throws 404 NotFound 查無此會員
 */
export const apiClientRemoveAdminUser = async (id: string) =>
  deleteRequest<ApiResult<ClientUser>>(`/zigong/client-users/${id}`);

/**
 * 後台-寄信通知(全部會員)
 */

export const apiClientNotifyAllUsers = async () =>
  postRequest<ApiResult<any>>(`/zigong/client-users/notify-all`);

/**
 * 後台-寄信通知(選擇部分會員)
 */
export const apiClientNotifySelectedUsers = async (id: any) =>
  postRequest<ApiResult<any>>(`/zigong/client-users/notify-selected`, id);
