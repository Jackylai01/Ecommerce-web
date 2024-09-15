import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice } from '@reduxjs/toolkit';
import { AuthAsyncAction, completeGoogleRegistrationAsync } from './actions';

type AuthState = ApiState<AuthAsyncAction> & {
  googleRegistrationSuccess: boolean;
};

const initialState: AuthState = {
  googleRegistrationSuccess: false,
  ...newApiState<AuthState>(AuthAsyncAction),
};

const authSlice = createSlice({
  name: ReducerName.PUBLIC_AUTH,
  initialState,
  reducers: {
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(completeGoogleRegistrationAsync.fulfilled, (state) => {
      state.googleRegistrationSuccess = true;
    });
    asyncMatcher(builder, ReducerName.PUBLIC_AUTH);
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
