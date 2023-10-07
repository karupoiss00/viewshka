import { useRouter } from 'next/router';
import { useCallback } from 'react';

type GetParamFn = (key: string) => string | null;
type SetParamFn = (params: Record<string, string>, replace?: boolean) => void;

function useSearchParams(): [GetParamFn, SetParamFn] {
  const router = useRouter();
  const getParam = useCallback(
    (key: string) => router.query[key]?.toString() || null,
    [router.query]
  );

  const setParams = useCallback(
    (params: Record<string, string>, replace = false) => {
      Object.keys(params).forEach((key) => {
        if (!params[key]) {
          delete params[key];
        }
      });

      router.push(
        {
          pathname: router.pathname,
          query: replace
            ? params
            : {
                ...router.query,
                ...params,
              },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router]
  );
  return [getParam, setParams];
}

export { useSearchParams };
