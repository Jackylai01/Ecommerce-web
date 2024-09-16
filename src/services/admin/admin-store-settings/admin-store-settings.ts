import { StoreSettingsResponse } from '@models/responses/storeSettings.res';
import { ApiResult, putRequest } from '@services/shared/api';

/**
 * 更新商店設置
 */
export const apiUpdateStoreSettings = async (data: FormData) =>
  putRequest<ApiResult<StoreSettingsResponse>>('/zigong/store-setting', data);
