import { useMemo } from "react";
import {
  useMultipleTimeSeriesData,
  useAllStatistics,
} from "./useAirQualityData";
import { AirQualityParameter, DateRange } from "@/types/api.types";

interface ChartDataPoint {
  timestamp: string;
  [parameter: string]: any;
}

interface BarChartDataPoint {
  parameter: string;
  value: number;
}

interface ChartDataReturn {
  timeSeriesData: ChartDataPoint[];
  barChartData: BarChartDataPoint[];
  totalDataPoints: number;
  averageQuality: number | null;
  statisticalData: any | [];
  isLoading: boolean;
  error: any;
}

export const useChartData = (
  selectedParameters: AirQualityParameter[],
  dateRange: DateRange,
  enabled = true
): ChartDataReturn => {
  const {
    data: rawTimeSeriesData,
    isLoading: timeSeriesLoading,
    error: timeSeriesError,
  } = useMultipleTimeSeriesData(
    selectedParameters,
    dateRange,
    enabled && selectedParameters.length > 0
  );

  const {
    data: statisticsData,
    isLoading: statisticsLoading,
    error: statisticsError,
  } = useAllStatistics(
    selectedParameters,
    dateRange,
    enabled && selectedParameters.length > 0
  );

  const timeSeriesData = useMemo((): ChartDataPoint[] => {
    if (!rawTimeSeriesData || !Array.isArray(rawTimeSeriesData)) {
      return [];
    }

    const timestampMap = new Map<string, ChartDataPoint>();

    rawTimeSeriesData.forEach((receivedData) => {
      const seriesData = receivedData?.data?.data;
      const parameter = receivedData?.data?.parameter;

      if (seriesData && Array.isArray(seriesData) && parameter) {
        seriesData.forEach((point) => {
          if (
            point &&
            point.timestamp !== undefined &&
            point.value !== undefined
          ) {
            if (!timestampMap.has(point.timestamp)) {
              timestampMap.set(point.timestamp, { timestamp: point.timestamp });
            }
            timestampMap.get(point.timestamp)![parameter] = point.value;
          }
        });
      }
    });

    return Array.from(timestampMap.values()).sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [rawTimeSeriesData]);

  const barChartData = useMemo((): BarChartDataPoint[] => {
    if (!statisticsData || !Array.isArray(statisticsData)) {
      return [];
    }

    return statisticsData.map((receivedData: any) => ({
      parameter: receivedData?.data?.parameter,
      value: receivedData?.data?.avg || 0,
    }));
  }, [statisticsData]);

  const averageQuality = useMemo((): number | null => {
    if (
      !statisticsData ||
      !Array.isArray(statisticsData) ||
      statisticsData.length === 0
    ) {
      return null;
    }

    statisticsData?.map((receivedData) => receivedData?.data);

    const total = statisticsData.reduce(
      (acc, stat) => acc + (stat.avg || stat.average || 0),
      0
    );
    return total / statisticsData.length;
  }, [statisticsData]);

  const statisticalData = useMemo((): any | [] => {
    if (
      !statisticsData ||
      !Array.isArray(statisticsData) ||
      statisticsData.length === 0
    ) {
      return null;
    }
    return statisticsData?.map((receivedData) => receivedData?.data);
  }, [statisticsData]);

  const totalDataPoints = timeSeriesData.length;
  const isLoading = timeSeriesLoading || statisticsLoading;
  const error = timeSeriesError || statisticsError;

  return {
    timeSeriesData,
    barChartData,
    totalDataPoints,
    averageQuality,
    statisticalData,
    isLoading,
    error,
  };
};
