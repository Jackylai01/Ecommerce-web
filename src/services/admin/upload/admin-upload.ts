import { ApiResult, deleteRequest, postRequest } from '../../shared/api';

export interface CloudinaryUploadResponse {
  imageUrl: string;
  imageId: string;
  tempProductId?: string;
}

interface UploadResponse {
  imageUrl: string;
}

/**
 * 上傳圖片到cloudinary服務器
 * @param {File[]} data - 要上傳的圖片文件數組
 * @param {string} folderName - 上傳到的目標資料夾名稱
 * @returns {Promise<ApiResult<any>>} - 上傳結果
 */

// 调整apiAdminUpload以匹配后端API的期望
export const apiAdminUpload = async (
  file: File,
  folderName?: string,
  tempProductId?: string,
  imageId?: string,
) => {
  const formData = new FormData();
  formData.append('image', file);

  if (folderName) {
    formData.append('folderName', folderName);
  }

  if (tempProductId) {
    formData.append('tempProductId', tempProductId);
  }

  if (imageId) {
    formData.append('imageId', imageId);
  }

  const headers = { 'Content-Type': 'multipart/form-data' };

  return postRequest<ApiResult<CloudinaryUploadResponse>>(
    '/zigong/upload-image',
    formData,
    headers,
  );
};

/**
 * 删除 Cloudinary 上的单张图片
 * @param {string} publicId - 要删除的图片的 Cloudinary Public ID
 * @returns {Promise<ApiResult<any>>} - 删除操作的结果
 */
export const apiAdminDeleteImage = async (publicId: string) => {
  const encodedPublicId = encodeURIComponent(publicId);
  return deleteRequest<ApiResult<any>>(`/zigong/images/${encodedPublicId}`);
};
