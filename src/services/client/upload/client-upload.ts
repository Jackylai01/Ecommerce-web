import {
  ApiListResult,
  ApiResult,
  deleteRequest,
  postRequest,
} from '../../shared/api';

export interface CloudinaryUploadResponse {
  imageUrl: string;
  imageId: string;
}

/**
 * 上傳圖片到cloudinary服務器
 * @param {File[]} data - 要上傳的圖片文件數組
 * @param {string} folderName - 上傳到的目標資料夾名稱
 * @returns {Promise<ApiResult<any>>} - 上傳結果
 */

export const apiClientUpload = async (data: File[], folderName: string) => {
  const formData = new FormData();
  data.forEach((image: any) => {
    formData.append('images', image);
  });
  formData.append('folderName', folderName);
  const headers = { 'Content-Type': 'multipart/form-data' };
  return postRequest<ApiListResult<any[]>>(
    '/zigong/images/upload',
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
