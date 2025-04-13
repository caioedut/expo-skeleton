import type { AxiosRequestConfig, Method } from 'axios';

import { useMemo } from 'react';

import { Str } from 'hpr';
import useSWR, { type SWRConfiguration, useSWRConfig } from 'swr';

import { addQueryParam, type ApiInstance } from '@/helpers/api.helper';
import Api from '@/services/Api';
import { AnyObject } from '@/types/util.type';

export type UseRequestOptions = Pick<AxiosRequestConfig, 'headers'> &
  Pick<SWRConfiguration, 'fetcher'> & {
    api?: ApiInstance;
    autoFetch?: boolean;
    autoFetchInterval?: number;
    autoRevalidate?: boolean;
    method?: Method;
    noCache?: boolean;
    params?: AnyObject;
    retryOnError?: boolean;
  };

export default function useRequest<T>(
  key: 0 | false | null | string | undefined,
  {
    api = Api,
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

  let url: string;
  let fullKey = useMemo(() => Str.from(key), [key]);

  if (fullKey) {
    if (params) {
      fullKey = addQueryParam(fullKey, params);
    }

    url = fullKey;
  }

  if (!fetcher) {
    fetcher = () => api.request({ headers, method, url }).then(({ data }) => data);
  }

  useMemo(() => {
    if (fullKey && noCache) {
      cache.delete(fullKey);
    }
  }, [fullKey, cache, noCache]);

  const request = useSWR<T>(fullKey || null, fetcher, {
    dedupingInterval: noCache ? 0 : 10000,
    focusThrottleInterval: noCache ? 0 : 10000,
    refreshInterval: autoFetchInterval,
    revalidateIfStale: autoFetch,
    revalidateOnFocus: autoRevalidate,
    revalidateOnMount: autoFetch,
    revalidateOnReconnect: autoRevalidate,
    shouldRetryOnError: retryOnError,
  });

  return useMemo(
    () => ({
      data: request.data,
      error: request.error,
      isLoading: request.isLoading,
      isValidating: request.isValidating,
      mutate: (data: ((prev: T) => Promise<T> | T) | T) => request.mutate(data as any, { revalidate: false }),
      revalidate: () => request.mutate(),

      state: {
        error: request.error,
        loading: request.isLoading,
        empty: (request.data as AnyObject)?.rows
          ? !(request.data as AnyObject)?.rows?.length
          : Array.isArray(request.data)
            ? !request.data?.length
            : !request.data,
        onRefresh: () => request.mutate(),
      },
    }),
    [request],
  );
}
