import type { AnyObject } from '@react-bulk/core';
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { type Options, serialize } from 'object-to-formdata';
import qs, { type BooleanOptional, type IStringifyOptions } from 'qs';

import LocalStorage from '@/services/LocalStorage';

type ApiOptions = {
  baseURL: string;
};

type ApiInstance = {
  baseURL: string;
  save<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    id: any,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
} & AxiosInstance;

export function api({ baseURL }: ApiOptions) {
  const instance = axios.create({
    baseURL,
    paramsSerializer: (params) => queryString(params),
  }) as ApiInstance;

  // Save API
  instance.save = (url, id, data?, config?) => {
    return id ? instance.put(`${url}/${id}`, data, config) : instance.post(url, data, config);
  };

  // Auth Bearer
  instance.interceptors.request.use(async (config) => {
    const token = await LocalStorage.get<string>('token');

    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
}

export function queryString(params: AnyObject = {}, options?: IStringifyOptions<BooleanOptional>) {
  return qs.stringify(parseParams(params), {
    arrayFormat: 'brackets',
    ...(options || {}),
  });
}

export function addQueryParam(url: string, params: AnyObject) {
  const glue = url.includes('?') ? '&' : '?';
  return `${url}${glue}${queryString(params)}`;
}

export function formData(data: AnyObject = {}, options: Options = {}) {
  return serialize(parseParams(data), { indices: true, ...options });
}

export function parseParams(data: AnyObject = {}) {
  const result: AnyObject = {};

  for (const attr in data) {
    let value = data[attr];

    // Ignore undefined
    if (typeof value === 'undefined') {
      continue;
    }

    // Transform bool to intbool
    if (typeof value === 'boolean') {
      value = Number(value);
    }

    // Transform null to empty string
    if (value === null) {
      value = '';
    }

    // Recursive for array or object
    if (Array.isArray(value) || value instanceof Object) {
      //if (!(value instanceof FileList) && !(value instanceof File)) {
      value = parseParams(value);
      //}
    }

    result[attr] = value;
  }

  return result;
}

export function getError(err: any, def = 'Houve uma falha na requisição.') {
  if (typeof err === 'string') {
    return err;
  }

  return (
    err?.response?.data?.mensagem ||
    err?.data?.mensagem ||
    err?.response?.data?.message ||
    err?.data?.message ||
    err?.mensagem ||
    err?.message ||
    def
  );
}

export function urlAddToken(url: string) {
  const token = LocalStorage.get('token');
  const glue = url.includes('?') ? '&' : '?';
  return `${url}${glue}token=${token}`;
}
