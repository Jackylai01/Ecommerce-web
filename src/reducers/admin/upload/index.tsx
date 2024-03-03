import { ReducerName } from '@enums/reducer-name';
import { asyncMatcher } from '@helpers/extra-reducers';
import { newApiState } from '@helpers/initial-state';
import { ApiState } from '@models/api/api-state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  adminDeleteFilesAsync,
  AdminUploadAction,
  adminUploadAsync,
} from './actions';

type AdminUploadState = ApiState<AdminUploadAction> & {
  fieldName: string | null;
  file: any | null;
  uploadedImages: any[];
  isArticleOperation: boolean;
};

const initialState: AdminUploadState = {
  fieldName: null,
  file: null,
  uploadedImages: [],
  isArticleOperation: false,
  ...newApiState<AdminUploadState>(AdminUploadAction),
};

const adminUploadSlice = createSlice({
  name: ReducerName.ADMIN_UPLOAD,
  initialState,
  reducers: {
    setAdminUploadFieldName: (state, action: PayloadAction<string>) => {
      state.fieldName = action.payload;
    },
    resetAdminUpload: () => initialState,
    setArticleOperation: (state, action) => {
      state.isArticleOperation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminUploadAsync.fulfilled, (state, action) => {
      state.file = action.payload;
      if (Array.isArray(action.payload)) {
        state.uploadedImages = action.payload.map((img: any) => ({
          imageUrl: img.imageUrl,
          imageId: img.imageId,
        }));
      }
    });
    builder.addCase(adminDeleteFilesAsync.fulfilled, (state, action) => {
      const deletedImageId = action.payload;
      state.uploadedImages = state.uploadedImages.filter(
        (image) => image.imageId !== deletedImageId,
      );
    });
    asyncMatcher(builder, ReducerName.ADMIN_UPLOAD);
  },
});

export const {
  setAdminUploadFieldName,
  resetAdminUpload,
  setArticleOperation,
} = adminUploadSlice.actions;
export default adminUploadSlice.reducer;
