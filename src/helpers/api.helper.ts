import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
} from 'axios';
import { type Options, serialize } from 'object-to-formdata';
import qs, { type BooleanOptional, type IStringifyOptions } from 'qs';
import { ZodError } from 'zod';

import LocalStorage from '@/services/LocalStorage';
import { AnyObject } from '@/types/util.type';

export type ApiInstance = AxiosInstance & {
  baseURL: string;
  save<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    id: any,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
};

export type ApiOptions = {
  baseURL: string;
  authHeaders?:
    | ((token: null | string) => CreateAxiosDefaults['headers'] | Promise<CreateAxiosDefaults['headers']>)
    | CreateAxiosDefaults['headers'];
};

export function addQueryParam(url: string, params?: AnyObject) {
  const query = queryString(params);
  const glue = !query ? '' : url.includes('?') ? '&' : '?';
  return `${url}${glue}${query}`;
}

export function api({ authHeaders, baseURL, ...axiosConfig }: ApiOptions & CreateAxiosDefaults) {
  const instance = axios.create({
    ...axiosConfig,
    baseURL,
    paramsSerializer: (params) => queryString(params),
  }) as ApiInstance;

  instance.baseURL = baseURL;

  // Save API
  instance.save = (url, id, data?, config?) => {
    return id ? instance.put(`${url}/${id}`, data, config) : instance.post(url, data, config);
  };

  // Auth Bearer
  instance.interceptors.request.use(async (config) => {
    const token = (await LocalStorage.get<string>('token')) ?? null;

    if (typeof authHeaders === 'function') {
      Object.assign(config.headers, await authHeaders(token));
    } else if (authHeaders) {
      Object.assign(config.headers, authHeaders);
    } else if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
}

export function formData(data: AnyObject = {}, options: Options = {}) {
  return serialize(parseParams(data), { indices: true, ...options });
}

export function getError(err: any, def = 'Houve uma falha na requisição.') {
  if (typeof err === 'string') {
    return err;
  }

  if (err instanceof ZodError) {
    return err.issues[0]?.message;
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
      if (!['File', 'FileList'].includes(value?.constructor?.name)) {
        value = parseParams(value);
      }
    }

    result[attr] = value;
  }

  return result;
}

export function queryString(params: AnyObject = {}, options?: IStringifyOptions<BooleanOptional>) {
  return qs.stringify(parseParams(params), {
    arrayFormat: 'brackets',
    ...(options || {}),
  });
}
