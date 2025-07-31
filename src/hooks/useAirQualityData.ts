import { useQuery } from '@tanstack/react-query';
import { airQualityApi } from '@/services/api';
import { AirQualityParameter, DateRange } from '@/types/api.types';

export const useTimeSeriesData = (
  parameter: AirQualityParameter,
  dateRange?: DateRange,
  enabled = true
) => {
  return useQuery({
    queryKey: ['timeSeriesData', parameter, dateRange],
    queryFn: () => airQualityApi.getTimeSeriesData(parameter, dateRange),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const useMultipleTimeSeriesData = (
  parameters: AirQualityParameter[],
  dateRange?: DateRange,
  enabled = true
) => {
  return useQuery({
    queryKey: ['multipleTimeSeriesData', parameters, dateRange],
    queryFn: () => airQualityApi.getMultipleTimeSeriesData(parameters, dateRange),
    enabled: enabled && parameters.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useStatisticsData = (
  parameter: AirQualityParameter,
  dateRange?: DateRange,
  enabled = true
) => {
  return useQuery({
    queryKey: ['statisticsData', parameter, dateRange],
    queryFn: () => airQualityApi.getStatistics(parameter, dateRange),
    enabled,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useAllStatistics = (
  parameters: AirQualityParameter[],
  dateRange?: DateRange,
  enabled = true
) => {
  return useQuery({
    queryKey: ['allStatistics', parameters, dateRange],
    queryFn: () => airQualityApi.getAllStatistics(parameters, dateRange),
    enabled: enabled && parameters.length > 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });
};

export const useDateRange = (enabled = true) => {
  return useQuery({
    queryKey: ['dateRange'],
    queryFn: () => airQualityApi.getDateRange(),
    enabled,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: 1000 * 60 * 60, // 1 hour
  });
};