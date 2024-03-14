import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { ProductQueryParams } from '@models/entities/shared/query';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiAddProduct,
  apiDeleteAllProducts,
  apiDeleteProduct,
  apiGetAllProducts,
  apiGetProductById,
  apiUpdateProduct,
} from '@services/admin/products/products';

export enum ProductAction {
  getAllProducts = 'getAllProducts',
  getProductById = 'getProductById',
  addProduct = 'addProduct',
  updateProduct = 'updateProduct',
  deleteProduct = 'deleteProduct',
  deleteAllProducts = 'deleteAllProducts',
}

export const getAllProductsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.getAllProducts}`,
  async ({ page, limit }: ProductQueryParams) => {
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
