import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiRequestReturn } from '@services/client/refunds/client-refunds';

export enum clientQequestReturnAction {
  requestReturn = 'requestReturn',
}

export const requestReturnAsync = createAsyncThunk(
  `${ReducerName.CLIENT_REQUESTRETURN}/${clientQequestReturnAction.requestReturn}`,
  async (data: any) => {
    const response = await apiRequestReturn(data);
    return response.result.data;
  },
);
