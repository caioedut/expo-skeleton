import type { AxiosRequestConfig, Method } from 'axios';

import { useEffect, useMemo } from 'react';

import useSWR, { type SWRConfiguration, useSWRConfig } from 'swr';

import { type ApiInstance, addQueryParam } from '@/helpers/api.helper';
import ApiDefault from '@/services/ApiDefault';
import LocalStorage from '@/services/LocalStorage';
import { Falsy } from '@/types/util.type';

export type UseRequestOptions = {
  api?: ApiInstance;
  autoFetch?: boolean;
  autoFetchInterval?: number;
  autoRevalidate?: boolean;
  method?: Method;
  noCache?: boolean;
  retryOnError?: boolean;
} & Pick<AxiosRequestConfig, 'headers' | 'params'> &
  Pick<SWRConfiguration, 'fetcher'>;

export default function useRequest<T>(
  key: Falsy<string>,
  {
    api = ApiDefault,
    autoFetch = true,
    autoFetchInterval,
    autoRevalidate = true,
    fetcher,
    headers,
    method = 'GET',
    noCache,
    params,
    retryOnError = true,
  }: UseRequestOptions = {},
) {
  const { cache } = useSWRConfig();

  if (key && params) {
    key = addQueryParam(key, params);
  }

  if (!fetcher) {
    fetcher = (url: string) => api.request({ headers, method, url }).then(({ data }) => data);
  }

  useMemo(() => {
    if (key && noCache) {
      cache.delete(key);
    }
  }, [key, cache, noCache]);

  const request = useSWR<T>(key, fetcher, {
    dedupingInterval: noCache ? 0 : 10000,
    focusThrottleInterval: noCache ? 0 : 10000,
    refreshInterval: autoFetchInterval,
    revalidateIfStale: autoFetch,
    revalidateOnFocus: autoRevalidate,
    revalidateOnMount: autoFetch,
    revalidateOnReconnect: autoRevalidate,
    shouldRetryOnError: retryOnError,
  });

  // sync storage
  useEffect(() => {
    if (!key || request.isLoading || request.isValidating || typeof request.data === 'undefined') return;
    LocalStorage.set(`swr.${key}`, request.data).catch(() => null);
  }, [key, request]);

  return useMemo(
    () => ({
      data: request.data,
      error: request.error,
      isLoading: request.isLoading,
      isValidating: request.isValidating,
      mutate: (data: ((prev: T) => Promise<T> | T) | T) => request.mutate(data as any, { revalidate: false }),
      revalidate: () => request.mutate(),
    }),
    [request],
  );
}
