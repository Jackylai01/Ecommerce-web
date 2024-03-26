import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { Metadata } from '@models/entities/shared/pagination';
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
  adminDeleteUserAsync,
  adminGetAllUsersAsync,
  adminGetUserProfileAsync,
  adminLoginAsync,
  adminLogoutAsync,
  adminModifyProfileAsync,
  adminRefreshTokenAsync,
  adminToggleUserRoleAsync,
  adminUploadProfileImageAsync,
  adminVerificationTokenAsync,
} from './actions';

type AdminAuthState = ApiState<AdminAuthAsyncAction> & {
  list: ProfileResponse[] | null;

  metadata: Metadata | null;
  userInfo: UserInfo | null;
  userProfile: ProfileResponse | null;
  createAccount: UserCreateAccountResponse | null;
};

const initialState: AdminAuthState = {
  list: null,
  metadata: null,
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
    builder.addCase(adminGetAllUsersAsync.fulfilled, (state, action) => {
      state.list = action.payload.data;
      state.metadata = action.payload.metadata;
    });
    builder.addCase(adminDeleteUserAsync.fulfilled, (state, action) => {
      if (state.list) {
        state.list = state.list.filter(
          (user) => user._id !== action.payload.id,
        );
      }
    });
    builder.addCase(adminToggleUserRoleAsync.fulfilled, (state, action) => {
      if (state.list && action.payload && action.payload._id) {
        state.list = state.list.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        );
      }
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
