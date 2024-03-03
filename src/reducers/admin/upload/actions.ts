import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAdminDeleteImage,
  apiAdminUpload,
} from '@services/admin/upload/admin-upload';
import { setArticleOperation } from '.';

export enum AdminUploadAction {
  upload = 'upload',
  delete = 'delete',
}

export const adminUploadAsync = createAsyncThunk(
  `${ReducerName.ADMIN_UPLOAD}/${AdminUploadAction.upload}`,
  async (
    { data, folderName }: { data: File[]; folderName: string },
    { dispatch },
  ) => {
    const response = await apiAdminUpload(data, folderName);
    dispatch(setArticleOperation(true));
    return response.result.data;
  },
);

export const adminDeleteFilesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_UPLOAD}/${AdminUploadAction.delete}`,
  async (publicId: string, { dispatch }) => {
    const response = await apiAdminDeleteImage(publicId);
    dispatch(setArticleOperation(true));
    return response.result.data;
  },
);
