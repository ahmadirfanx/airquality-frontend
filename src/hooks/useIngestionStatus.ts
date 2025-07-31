import { useQuery } from '@tanstack/react-query';
import { airQualityApi } from '@/services/api';
import { POLLING_INTERVALS } from '@/utils/constants';

export const useIngestionStatus = (jobId: string | null, enabled = true) => {
  return useQuery({
    queryKey: ['ingestionStatus', jobId],
    queryFn: () => {
      if (!jobId) throw new Error('Job ID is required');
      return airQualityApi.getIngestionStatus(jobId);
    },
    enabled: enabled && !!jobId,
    refetchInterval: (query) => {
      // Stop polling if job is completed or failed
      if (!query.state.data || query.state.data.state === 'completed' || query.state.data.state === 'failed') {
        return false;
      }
      return POLLING_INTERVALS.ingestion;
    },
    retry: (failureCount, error: any) => {
      // Don't retry if job not found (404)
      if (error?.response?.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 0, // Always fetch fresh data
    gcTime: 1000 * 60 * 5, // Keep in cache for 5 minutes
  });
};