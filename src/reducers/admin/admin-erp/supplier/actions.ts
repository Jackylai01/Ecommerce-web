import { ReducerName } from '@enums/reducer-name';
import { PagingQuery } from '@models/entities/shared/pagination';
import { Supplier } from '@models/responses/supplier';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  apiCreateSuppliers,
  apiGetSuppliers,
} from '@services/admin/admin-erp/supplier';

export enum adminERPSupplierAction {
  getSuppliers = 'getSuppliers',
  createSuppliers = 'createSuppliers',
}

export const getSuppliersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_SUPPLIER}/${adminERPSupplierAction.getSuppliers}`,
  async (query: PagingQuery) => {
    const response = await apiGetSuppliers(query);
    return response.result;
  },
);

export const createSuppliersAsync = createAsyncThunk(
  `${ReducerName.ADMIN_ERP_SUPPLIER}/${adminERPSupplierAction.createSuppliers}`,
  async (data: Supplier) => {
    const response = await apiCreateSuppliers(data);
    return response.result.data;
  },
);
