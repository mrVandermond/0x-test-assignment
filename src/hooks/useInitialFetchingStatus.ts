import { useQueries, UseQueryOptions } from '@tanstack/react-query';

/**
 * Defines whether initial fetching is performing or not
 * Initial fetching here is when query doesn't have cached data and status is pending
 *
 * @param queriesOptions - array of query options which should be tracked
 */
export const useInitialFetchingStatus = (queriesOptions: UseQueryOptions<any, any, any, any>[]) => {
  return useQueries({
    queries: queriesOptions,
    combine: (result) => result.some(
      (res) => !res.data && res.status === 'pending',
    ),
  });
}
