import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import { StoreSettingsAction, updateStoreSettingsAsync } from './actions';

type StoreSettingsState = ApiState<StoreSettingsAction> & {
  settings: any | null;
};

const initialState: StoreSettingsState = {
  settings: null,
  ...newApiState<StoreSettingsState>(StoreSettingsAction),
};

const storeSettingsSlice = createSlice({
  name: ReducerName.ADMIN_STORE_SETTING,
  initialState,
  reducers: {
    resetAdminStoreSetting: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateStoreSettingsAsync.fulfilled, (state, action) => {
      state.settings = action.payload;
    });
    asyncMatcher(builder, ReducerName.ADMIN_STORE_SETTING);
  },
});

export const { resetAdminStoreSetting } = storeSettingsSlice.actions;

export default storeSettingsSlice.reducer;
