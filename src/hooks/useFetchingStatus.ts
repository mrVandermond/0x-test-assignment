import { useQueries, UseQueryOptions } from '@tanstack/react-query';

/**
 * Defines whether fetching is performing or not
 *
 * @param queriesOptions - array of query options which should be tracked
 */
export const useFetchingStatus = (queriesOptions: UseQueryOptions<any, any, any, any>[]) => {
  return useQueries({
    queries: queriesOptions,
    combine: (result) => result.some(
      (res) => res.isFetching,
    ),
  });
}
