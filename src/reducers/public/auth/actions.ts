import { createAsyncThunk } from '@reduxjs/toolkit';

import { ReducerName } from '@enums/reducer-name';
import { apiCompleteGoogleRegistration } from '@services/public/auth/auth';

export enum AuthAsyncAction {
  googleCompleteRegistration = 'googleCompleteRegistration',
}

/**
 * 完成 Google OAuth 註冊流程
 */
export const completeGoogleRegistrationAsync = createAsyncThunk(
  `${ReducerName.PUBLIC_AUTH}/${AuthAsyncAction.googleCompleteRegistration}`,
  async (data: { token: string; address: string; phone: string }) => {
    const response = await apiCompleteGoogleRegistration(data);
    return response.result;
  },
);
