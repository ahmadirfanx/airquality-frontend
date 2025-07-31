import axios from 'axios';
import {
  AirQualityMeasurement,
  IngestionJob,
  IngestionStatusResponse,
  TimeSeriesData,
  StatisticsData,
  DateRange,
  ApiResponse,
  UploadResponse,
  HealthCheck,
  AirQualityParameter
} from '@/types/api.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method?.toUpperCase(), config.url);
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export const airQualityApi = {
  // File upload
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<UploadResponse>('/api/ingest', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Check ingestion status
  getIngestionStatus: async (jobId: string): Promise<IngestionJob> => {
    const response = await api.get<IngestionStatusResponse>(`/api/ingest/status/${jobId}`);
    // Transform API response to internal format
    return {
      jobId: response.data.data.jobId,
      status: response.data.data.state,
      progress: {
        processed: 0, // These would come from actual API if available
        total: 100,
        percentage: response.data.data.state === 'completed' ? 100 : 
                   response.data.data.state === 'processing' ? 50 : 0
      }
    };
  },

  // Get time series data
  getTimeSeriesData: async (
    parameter: AirQualityParameter,
    dateRange?: DateRange
  ): Promise<TimeSeriesData> => {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
    if (dateRange?.endDate) params.append('endDate', dateRange.endDate);
    
    const response = await api.get<TimeSeriesData>(
      `/api/air-quality/time-series/${parameter}?${params}`
    );
    return response.data;
  },

  // Get date range of available data
  getDateRange: async (dateRange?: DateRange): Promise<{ minDate: string; maxDate: string }> => {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
    if (dateRange?.endDate) params.append('endDate', dateRange.endDate);
    
    const response = await api.get<{ minDate: string; maxDate: string }>(
      `/api/air-quality/date-range?${params}`
    );
    return response.data;
  },

  // Get statistics for a parameter
  getStatistics: async (
    parameter: AirQualityParameter,
    dateRange?: DateRange
  ): Promise<StatisticsData> => {
    const params = new URLSearchParams();
    if (dateRange?.startDate) params.append('startDate', dateRange.startDate);
    if (dateRange?.endDate) params.append('endDate', dateRange.endDate);
    
    const response = await api.get<StatisticsData>(
      `/api/air-quality/statistics/${parameter}?${params}`
    );
    return response.data;
  },

  // Health check
  getHealth: async (): Promise<HealthCheck> => {
    const response = await api.get<HealthCheck>('/api/health');
    return response.data;
  },

  // Get multiple parameters data for comparison
  getMultipleTimeSeriesData: async (
    parameters: AirQualityParameter[],
    dateRange?: DateRange
  ): Promise<TimeSeriesData[]> => {
    const promises = parameters.map(param => 
      airQualityApi.getTimeSeriesData(param, dateRange)
    );
    return Promise.all(promises);
  },

  // Get all statistics for comparison
  getAllStatistics: async (
    parameters: AirQualityParameter[],
    dateRange?: DateRange
  ): Promise<StatisticsData[]> => {
    const promises = parameters.map(param => 
      airQualityApi.getStatistics(param, dateRange)
    );
    return Promise.all(promises);
  }
};

export default api;