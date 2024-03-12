import { ReducerName } from '@enums/reducer-name';
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

// 获取所有产品的Async Action
export const getAllProductsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.getAllProducts}`,
  async (query: any) => {
    const response = await apiGetAllProducts(query);
    return response.res.data;
  },
);

// 根据ID获取单个产品的Async Action
export const getProductByIdAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.getProductById}`,
  async (id: string) => {
    const response = await apiGetProductById(id);
    return response.result.data;
  },
);

// 添加产品的Async Action
export const addProductAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.addProduct}`,
  async (body: any) => {
    const response = await apiAddProduct(body);
    return response.result.data;
  },
);

// 更新产品的Async Action
export const updateProductAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.updateProduct}`,
  async ({ id, body }: { id: string; body: any }) => {
    const response = await apiUpdateProduct(id, body);
    return response.result.data;
  },
);

// 删除单个产品的Async Action
export const deleteProductAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.deleteProduct}`,
  async (id: string) => {
    await apiDeleteProduct(id);
    return id;
  },
);

// 删除所有产品的Async Action
export const deleteAllProductsAsync = createAsyncThunk(
  `${ReducerName.PRODUCT}/${ProductAction.deleteAllProducts}`,
  async () => {
    await apiDeleteAllProducts();
  },
);
