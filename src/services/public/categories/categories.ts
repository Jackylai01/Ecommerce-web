import { formatQueryString } from '@helpers/query';
import { PagingQuery } from '@models/entities/shared/pagination';
import { CategoryResponse } from '@models/responses/category.res';
import { ProductsResponse } from '@models/responses/products.res';
import { ApiPaginationResult, ApiResult, getRequest } from '../../shared/api';

/**
 * 前台-取得類別列表
 */
export const apiGetCategories = async (query: PagingQuery) =>
  getRequest<ApiPaginationResult<CategoryResponse>>(
    formatQueryString('/categories', query),
  );

export const apiGetPublicCategoryById = async (id: string, slug: string) =>
  getRequest<
    ApiResult<{ category: CategoryResponse; products: ProductsResponse[] }>
  >(`/public/categories/${id}-${slug}`);
