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
  AdminAuthAsyncAction,
  adminCreateAccountsAsync,
  adminGetUserProfileAsync,
  adminLoginAsync,
  adminLogoutAsync,
  adminModifyProfileAsync,
  adminRefreshTokenAsync,
  adminUploadProfileImageAsync,
  adminVerificationTokenAsync,
} from './actions';

type AdminAuthState = ApiState<AdminAuthAsyncAction> & {
  userInfo: UserInfo | null;
  userProfile: ProfileResponse | null;
  createAccount: UserCreateAccountResponse | null;
};

const initialState: AdminAuthState = {
  userInfo: null,
  userProfile: null,
  createAccount: null,
  ...newApiState<AdminAuthState>(AdminAuthAsyncAction),
};

const adminAuthSlice = createSlice({
  name: ReducerName.ADMIN_AUTH,
  initialState,
  reducers: {
    setAdminUserInfo: (state, action: PayloadAction<AuthResponse>) => {
      state.userInfo = action.payload.userInfo;
    },
    resetAdminAuthStatus: (state) => {
      state.status = initialState.status;
    },
    resetCreateAccount: (state) => {
      state.createAccount = null;
    },
    resetAdminAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(adminLoginAsync.fulfilled, (state, action) => {
      adminAuthSlice.caseReducers.setAdminUserInfo(state, action);
    });
    builder.addCase(adminRefreshTokenAsync.fulfilled, (state, action) => {
      adminAuthSlice.caseReducers.setAdminUserInfo(state, action);
    });
    builder.addCase(adminLogoutAsync.fulfilled, (state) => {
      state.userInfo = null;
    });

    builder.addCase(adminGetUserProfileAsync.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    });
    builder.addCase(adminCreateAccountsAsync.fulfilled, (state, action) => {
      state.createAccount = action.payload;
    });
    builder.addCase(adminModifyProfileAsync.fulfilled, (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        ...action.payload,
      } as ProfileResponse;
    });

    builder.addCase(adminUploadProfileImageAsync.fulfilled, (state, action) => {
      if (!state.userProfile) {
        state.userProfile = {} as ProfileResponse;
      }
      state.userProfile.profileImage = action.payload.profileImage;
    });

    builder.addCase(adminVerificationTokenAsync.fulfilled, (state, action) => {
      if (!state.userProfile) {
        state.userProfile = {} as ProfileResponse;
      }
      state.userProfile.emailVerificationToken =
        action.payload.emailVerificationToken;
    });

    asyncMatcher(builder, ReducerName.ADMIN_AUTH);
  },
});

export const {
  setAdminUserInfo,
  resetAdminAuth,
  resetAdminAuthStatus,
  resetCreateAccount,
} = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
