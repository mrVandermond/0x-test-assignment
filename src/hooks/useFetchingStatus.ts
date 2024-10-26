import { useQueries, UseQueryOptions } from '@tanstack/react-query';

export const useFetchingStatus = (queriesOptions: UseQueryOptions<any, any, any, any>[]) => {
  return useQueries({
    queries: queriesOptions,
    combine: (result) => result.some(
      (res) => res.isFetching,
    ),
  });
}
