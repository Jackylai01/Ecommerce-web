import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { apiUpdateStoreSettings } from '@services/admin/admin-store-settings/admin-store-settings';

export enum StoreSettingsAction {
  updateSettings = 'updateSettings',
}

/**
 * 更新商店設置
 */
export const updateStoreSettingsAsync = createAsyncThunk(
  `${ReducerName.ADMIN_STORE_SETTING}/${StoreSettingsAction.updateSettings}`,
  async (data: FormData) => {
    const response = await apiUpdateStoreSettings(data);
    return response.result.data;
  },
);
