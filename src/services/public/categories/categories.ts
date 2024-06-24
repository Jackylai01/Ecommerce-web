import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { CategoryResponse } from '@models/responses/category.res';
import { ApiPaginationResult, getRequest } from '../../shared/api';

/**
 * 前台-取得類別列表
 */
export const apiGetCategories = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<CategoryResponse>>(
    formatQueryString('/categories', query),
  );
