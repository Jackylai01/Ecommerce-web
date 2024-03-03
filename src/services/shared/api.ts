import axios, { AxiosError, AxiosResponse } from 'axios';
import { Metadata } from '../../models/entities/shared/pagination';
import instance from './instance';

type AxiosRequestHeaders = Record<string, string | number | boolean>;

export const pureApiRequest = axios.create();

export const getRequest = async <T>(
  url: string,
  headers?: AxiosRequestHeaders,
) => {
  return instance.get<any, ApiResponse<T>>(url, { headers });
};

export const postRequest = async <T>(
  url: string,
  data?: any,
  headers?: AxiosRequestHeaders,
) => {
  return instance.post<any, ApiResponse<T>>(url, data, { headers });
};

export const putRequest = async <T>(
  url: string,
  data?: any,
  headers?: AxiosRequestHeaders,
) => {
  return instance.put<any, ApiResponse<T>>(url, data, { headers });
};

export const deleteRequest = async <T>(
  url: string,
  headers?: AxiosRequestHeaders,
) => {
  return instance.delete<any, ApiResponse<T>>(url, { headers });
};

export type ApiResponse<T> = {
  status: number;
  result: T;
  error?: ExceptionData | undefined;
  res: AxiosResponse;
  err?: AxiosError | undefined;
};
export type ApiResult<T> = {
  data: T;
};

export type ApiListResult<T> = {
  data: T[];
};

export type ApiPaginationResult<T> = {
  data: T[];
  metadata: Metadata;
};

export type ExceptionData = {
  statusCode: number;
  message: string;
  details: {
    message: string;
    field: string | undefined;
    value: any | undefined;
  }[];
  timestamp: string;
};
