import { Faq } from '@models/responses/faq.res';
import { ApiResult, getRequest } from '../../shared/api';

/**
 * 前台-取得常見問題列表
 */
export const apiPublicGetFaqs = async () =>
  getRequest<ApiResult<Faq[]>>('/public/faqs');
