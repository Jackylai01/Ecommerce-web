import {
  ApiListResult,
  ApiResult,
  deleteRequest,
  postRequest,
} from '../../shared/api';

/**
 * 後台-檔案上傳
 * @throws 400 BadRequest 欄位驗證錯誤
 */
// export const apiAdminUpload = async (file: File) => {
//   const body = {
//     fileName: file.name,
//     fileSize: file.size,
//   };
//   const response = await postRequest<
//     ApiResult<{
//       _id: string;
//       key: string;
//       url: string;
//       src: string;
//     }>
//   >('/zigong/upload', body);
//   const { result, error: uploadError } = response;
//   if (!result) {
//     throw uploadError;
//   }
//   await pureApiRequest.put(`${result?.data.url}`, file, {
//     headers: { 'Content-Type': file.type },
//   });

//   await postRequest(`/zigong/upload/${result?.data._id}`);
//   result.data.src = `${S3_STORAGE_URL}/${result.data.key}`;
//   return response;
// };

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

export const apiAdminUpload = async (data: File[], folderName: string) => {
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
