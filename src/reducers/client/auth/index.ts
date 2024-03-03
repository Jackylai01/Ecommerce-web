import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import {
  AuthResponse,
  ProfileResponse,
  UserCreateAccountResponse,
  UserInfo,
} from '@models/responses/user.res';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ClientAuthAsyncAction,
  clientDetailUserProfileAsync,
  clientLoginAsync,
  clientLogoutAsync,
  clientModifyProfileAsync,
  clientRefreshTokenAsync,
} from './actions';

type ClientAuthState = ApiState<ClientAuthAsyncAction> & {
  userInfo: UserInfo | null;
  userProfile: ProfileResponse | null;
  createAccount: UserCreateAccountResponse | null;
};

const initialState: ClientAuthState = {
  userInfo: null,
  userProfile: null,
  createAccount: null,
  ...newApiState<ClientAuthState>(ClientAuthAsyncAction),
};

const clientAuthSlice = createSlice({
  name: ReducerName.CLIENT_AUTH,
  initialState,
  reducers: {
    setClientUserInfo: (state, action: PayloadAction<AuthResponse>) => {
      state.userInfo = action.payload.userInfo;
    },
    resetClientAuthStatus: (state) => {
      state.status = initialState.status;
    },

    resetClientAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(clientLoginAsync.fulfilled, (state, action) => {
      clientAuthSlice.caseReducers.setClientUserInfo(state, action);
    });
    builder.addCase(clientRefreshTokenAsync.fulfilled, (state, action) => {
      clientAuthSlice.caseReducers.setClientUserInfo(state, action);
    });
    builder.addCase(clientLogoutAsync.fulfilled, (state) => {
      state.userInfo = null;
    });
    builder.addCase(clientDetailUserProfileAsync.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
    builder.addCase(clientModifyProfileAsync.fulfilled, (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        ...action.payload,
      } as ProfileResponse;
    });
    asyncMatcher(builder, ReducerName.CLIENT_AUTH);
  },
});

export const { setClientUserInfo, resetClientAuth, resetClientAuthStatus } =
  clientAuthSlice.actions;
export default clientAuthSlice.reducer;
