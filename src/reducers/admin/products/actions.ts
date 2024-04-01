import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { QueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddProduct,
  apiDeleteAllProducts,
  apiDeleteProduct,
  apiDeleteProductImage,
  apiGetAllProducts,
  apiGetProductById,
  apiUpdateProduct,
  apiUpdateProductStatus,
} from '@services/admin/products/products';

export enum ProductAction {
  getAllProducts = 'getAllProducts',
  getProductById = 'getProductById',
  addProduct = 'addProduct',
  updateProduct = 'updateProduct',
  deleteProduct = 'deleteProduct',
  deleteAllProducts = 'deleteAllProducts',
  updateProductStatus = 'updateProductStatus',
  deleteProductImage = 'deleteProductImage',
}

export const getAllProductsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.getAllProducts}`,
  async ({ page, limit }: QueryParams) => {
    const query: PagingQuery = { page, limit };
    const response = await apiGetAllProducts(query);
    return response.result;
  },
);

export const getProductByIdAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.getProductById}`,
  async (id: string) => {
    const response = await apiGetProductById(id);
    return response.result.data;
  },
);

export const addProductAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.addProduct}`,
  async (body: any) => {
    const response = await apiAddProduct(body);
    return response.result.data;
  },
);

export const updateProductAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.updateProduct}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateProduct(id, body);
    return response.result.data;
  },
);

export const deleteProductAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.deleteProduct}`,
  async (id: string) => {
    await apiDeleteProduct(id);
    return id;
  },
);

export const deleteAllProductsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.deleteAllProducts}`,
  async () => {
    await apiDeleteAllProducts();
  },
);

export const updateProductStatusAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.updateProductStatus}`,
  async ({ id, status }: { id: string; status: string }) => {
    const response = await apiUpdateProductStatus(id, status);
    return { id, status, data: response.result.data };
  },
);

export const deleteProductImageAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.deleteProductImage}`,
  async ({ productId, imageId }: { productId: string; imageId: string }) => {
    const response = await apiDeleteProductImage(productId, imageId);
    return { productId, imageId, data: response.result.data };
  },
);
