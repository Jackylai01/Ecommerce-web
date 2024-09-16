import { StoreSettingsResponse } from '@models/responses/storeSettings.res';
import { ApiResult, getRequest } from '../../shared/api';

/**
 * 獲取商店設置
 */
export const apiGetStoreSettings = async () =>
  getRequest<ApiResult<StoreSettingsResponse>>('/store-setting');
