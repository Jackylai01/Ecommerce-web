import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { IMembershipLevel } from '@models/requests/membership.req';
import { MembershipLevelResponse } from '@models/responses/membership.res';
import {
  ApiPaginationResult,
  ApiResult,
  getRequest,
  postRequest,
} from '@services/shared/api';

/**
 * 新增會員分級
 */
export const apiCreateMembershipLevel = async (data: IMembershipLevel) =>
  postRequest<ApiResult<MembershipLevelResponse>>(
    '/zigong/membership-levels',
    data,
  );

/**
 * 獲取全部會員分級
 */
export const apiGetAllMembershipLevels = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<MembershipLevelResponse>>(
    formatQueryString('/zigong/membership-levels', query),
  );

/**
 * 根據ID獲取會員分級
 */
export const apiGetMembershipLevelById = async (levelId: string) =>
  getRequest<ApiResult<MembershipLevelResponse>>(
    `/zigong/membership-levels/${levelId}`,
  );

/**
 * 更新會員分級
 */
export const apiUpdateMembershipLevel = async (levelId: string, data: any) =>
  postRequest<ApiResult<MembershipLevelResponse>>(
    `/zigong/membership-levels/${levelId}`,
    data,
  );

/**
 * 刪除會員分級
 */
export const apiDeleteMembershipLevel = async (levelId: string) =>
  postRequest<ApiResult<MembershipLevelResponse>>(
    `/zigong/membership-levels/${levelId}`,
  );

/**
 * 檢查並升級會員等級
 */
export const apiCheckAndUpgradeMembershipLevel = async () =>
  getRequest<ApiResult<MembershipLevelResponse>>(
    '/zigong/membership-levels/check-upgrade',
  );

/**
 * 更新訂單狀態並檢查會員等級
 */
export const apiUpdateMembershipLevelOrderStatus = async (
  orderId: string,
  data: any,
) =>
  postRequest<ApiResult<MembershipLevelResponse>>(
    `/zigong/membership-levels/Level-order/${orderId}`,
    data,
  );
