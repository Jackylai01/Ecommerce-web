import { ReducerName } from '@enums/reducer-name';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAdminDeleteImage,
  apiAdminUpload,
} from '@services/admin/upload/admin-upload';

export enum AdminUploadAction {
  upload = 'upload',
  delete = 'delete',
}

export const adminUploadAsync = createAsyncThunk(
  `${ReducerName.ADMIN_UPLOAD}/${AdminUploadAction.upload}`,
  async ({
    file,
    folderName,
    imageId,
  }: {
    file: File;
    folderName?: string;
    imageId?: string;
  }) => {
    const response = await apiAdminUpload(file, folderName, imageId);
    return response.result.data;
  },
);

export const adminDeleteFilesAsync = createAsyncThunk(
  `${ReducerName.ADMIN_UPLOAD}/${AdminUploadAction.delete}`,
  async (publicId: string) => {
    const response = await apiAdminDeleteImage(publicId);
    return response.result.data;
  },
);
