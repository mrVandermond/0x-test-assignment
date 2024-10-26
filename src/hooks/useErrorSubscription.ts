import { useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const useErrorSubscription = () => {
  const [error, setError] = useState<Error | null>(null);
  const [refetchHandlers, setRefetchHandlers] = useState<(() => void)[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    return queryClient.getQueryCache().subscribe((event) => {
      if (event.type === 'updated' && event.action.type === 'error') {
        const { data } = event.query.state;

        if (data) return;

        setError(event.action.error);
        setRefetchHandlers([...refetchHandlers, () => queryClient.invalidateQueries(event.query.queryKey)]);
      }
    });
  }, [queryClient, refetchHandlers]);

  const handleRefetch = useCallback(() => {
    refetchHandlers.forEach((fn) => fn());
    setRefetchHandlers([]);
    setError(null);
  }, [refetchHandlers]);

  return {
    error,
    handleRefetch,
  };
};
